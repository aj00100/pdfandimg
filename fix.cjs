const fs = require('fs');
const path = require('path');

const dirs = ['/home/asus/mini_web/src/components', '/home/asus/mini_web/src/pages'];

const processFile = (filePath) => {
  if (!filePath.endsWith('.astro')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Let's just fix it by finding `.name.substring` and replacing the whole line properly.
  // Actually, wait! My previous run of `node fix.cjs` failed on the `replace` because the code was already reverted by git!
  // I ran `git checkout src/components/*.astro src/pages/*.astro`.
  // So all files are currently back to `.name.split('.')[0]`!
  // I just need to run the `fix.cjs` script again but WITH the fixed string.
  
  // Bug 2: .split('.')[0]
  content = content.replace(/([a-zA-Z0-9_\[\]\.]+)\.name\.split\('\.'\)\[0\]/g, "($1.name.substring(0, $1.name.lastIndexOf('.')) || $1.name)");

  // Bug 7: dropZone target
  content = content.replace(/if\s*\(\s*e\.target\s*!==\s*changeBtn\s*&&\s*e\.target\s*!==\s*document\.querySelector\([^)]+\)\s*\)/g, "if (!(e.target as Element).closest('button'))");
  content = content.replace(/if\s*\(\s*e\.target\s*!==\s*changeImageBtn\s*&&\s*e\.target\s*!==\s*uploadLoading\s*\)/g, "if (!(e.target as Element).closest('button') && !(e.target as Element).closest('#upload-loading'))");

  // Memory leaks (revokeObjectURL)
  if (content.includes('URL.createObjectURL')) {
    if (!content.includes('blobUrlsToRevoke')) {
      content = content.replace(/if\s*\(\s*root\s*\)\s*\{/, "if (root) {\n    const blobUrlsToRevoke: string[] = [];");
      content = content.replace(/resetBtn\.addEventListener\('click',\s*\(\)\s*=>\s*\{/g, "resetBtn.addEventListener('click', () => {\n      blobUrlsToRevoke.forEach(u => URL.revokeObjectURL(u));\n      blobUrlsToRevoke.length = 0;");
      content = content.replace(/changeBtn\.addEventListener\('click',\s*\(e\)\s*=>\s*\{/g, "changeBtn.addEventListener('click', (e) => {\n      blobUrlsToRevoke.forEach(u => URL.revokeObjectURL(u));\n      blobUrlsToRevoke.length = 0;");
      content = content.replace(/(const|let)\s+([a-zA-Z0-9_]+)\s*=\s*URL\.createObjectURL\(([^)]+)\);/g, "$1 $2 = URL.createObjectURL($3);\n          blobUrlsToRevoke.push($2);");
      content = content.replace(/a\.href\s*=\s*URL\.createObjectURL\(([^)]+)\);/g, "const tempUrl = URL.createObjectURL($1);\n          blobUrlsToRevoke.push(tempUrl);\n          a.href = tempUrl;");
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
};

const crawl = (d) => {
  const files = fs.readdirSync(d);
  files.forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) crawl(full);
    else processFile(full);
  });
};

dirs.forEach(crawl);

// Bug 3
const pdfComp = '/home/asus/mini_web/src/components/PDFCompressor.astro';
let pdfCompContent = fs.readFileSync(pdfComp, 'utf8');
pdfCompContent = pdfCompContent.replace(
  "padding.fill(32); // 32 is space character\n          finalBlob = new Blob([finalBlob, padding], { type: 'application/pdf' });",
  "padding.fill(32); // 32 is space character\n          if (diff >= 2) {\n            padding[0] = 10; // \\n\n            padding[1] = 37; // %\n          }\n          finalBlob = new Blob([finalBlob, padding], { type: 'application/pdf' });"
);
fs.writeFileSync(pdfComp, pdfCompContent);

const jpgComp = '/home/asus/mini_web/src/components/JPGToPDFSize.astro';
let jpgCompContent = fs.readFileSync(jpgComp, 'utf8');
jpgCompContent = jpgCompContent.replace(
  "padding.fill(32); // 32 is space character\n          finalBlob = new Blob([finalBlob, padding], { type: 'application/pdf' });",
  "padding.fill(32); // 32 is space character\n          if (diff >= 2) {\n            padding[0] = 10; // \\n\n            padding[1] = 37; // %\n          }\n          finalBlob = new Blob([finalBlob, padding], { type: 'application/pdf' });"
);
fs.writeFileSync(jpgComp, jpgCompContent);
