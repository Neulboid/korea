
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.vitepress',
  'public',
  'dist',
  'coverage'
]);

let markdownCount = 0;
let imageCount = 0;
let linkCount = 0;

const errors = [];

function walkMarkdown(dir) {
  let files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdown(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function cleanUrl(url) {
  let value = url.trim().replace(/^<|>$/g, '');

  if (
    !value ||
    value.startsWith('#') ||
    /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(value)
  ) {
    return null;
  }

  value = value.split(/[?#]/)[0];

  try {
    value = decodeURIComponent(value);
  } catch {
    // 잘못된 URL 인코딩은 원문 그대로 검사
  }

  // VitePress base 경로 제거
  if (value === '/korea') value = '/';
  else if (value.startsWith('/korea/')) {
    value = value.slice('/korea'.length);
  }

  return value;
}

function isFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

function checkImage(url, source) {
  const value = cleanUrl(url);
  if (!value) return;

  imageCount++;

  const candidates = value.startsWith('/')
    ? [
        path.join(ROOT, 'public', value.slice(1)),
        path.join(ROOT, value.slice(1))
      ]
    : [
        path.resolve(path.dirname(source), value),
        path.join(ROOT, 'public', value),
        path.join(ROOT, value)
      ];

  if (!candidates.some(isFile)) {
    errors.push({
      type: '이미지',
      source: path.relative(ROOT, source),
      target: url
    });
  }
}

function checkLink(url, source) {
  const value = cleanUrl(url);
  if (!value) return;

  linkCount++;

  const target = value.startsWith('/')
    ? path.resolve(ROOT, value.slice(1))
    : path.resolve(path.dirname(source), value);

  const ext = path.extname(target);

  const candidates = ext
    ? [target]
    : [
        target,
        `${target}.md`,
        `${target}.html`,
        path.join(target, 'index.md'),
        path.join(target, 'index.html')
      ];

  if (!candidates.some(isFile)) {
    errors.push({
      type: '링크',
      source: path.relative(ROOT, source),
      target: url
    });
  }
}

function inspectMarkdown(file) {
  const content = fs.readFileSync(file, 'utf8');

  // HTML 이미지
  const htmlImages = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi;

  // Markdown 이미지
  const markdownImages = /!\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g;

  // Markdown 링크
  const markdownLinks = /(?<!!)\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g;

  // HTML 링크
  const htmlLinks = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi;

  let match;

  while ((match = htmlImages.exec(content)) !== null) {
    checkImage(match[1], file);
  }

  while ((match = markdownImages.exec(content)) !== null) {
    checkImage(match[1], file);
  }

  while ((match = markdownLinks.exec(content)) !== null) {
    checkLink(match[1], file);
  }

  while ((match = htmlLinks.exec(content)) !== null) {
    checkLink(match[1], file);
  }
}

console.log('\n================================');
console.log(' NEULVOID WIKI AUTO CHECK');
console.log('================================\n');

const files = walkMarkdown(ROOT);
markdownCount = files.length;

for (const file of files) {
  inspectMarkdown(file);
}

console.log(`검사한 Markdown 파일: ${markdownCount}개`);
console.log(`검사한 이미지: ${imageCount}개`);
console.log(`검사한 내부 링크: ${linkCount}개`);

if (errors.length > 0) {
  console.log('\n[ 오류 발견 ]\n');

  for (const error of errors) {
    console.log(`[${error.type}] ${error.source}`);
    console.log(`  경로: ${error.target}\n`);
  }

  console.log(`총 ${errors.length}개의 오류 후보가 발견됐습니다.`);
  process.exitCode = 1;
} else {
  console.log('\n[ 검사 완료 ]');
  console.log('누락된 이미지와 내부 링크가 발견되지 않았습니다.');
}

console.log('\n================================\n');
