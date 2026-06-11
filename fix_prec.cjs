const fs = require('fs');
const path = require('path');

const dirs = ['/home/asus/mini_web/src/components', '/home/asus/mini_web/src/pages'];

const processFile = (filePath) => {
  if (!filePath.endsWith('.astro')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/([a-zA-Z0-9_\[\]\.]+)\.name\.substring\(0,\s*\1\.name\.lastIndexOf\('\.'\)\)\s*\|\|\s*\1\.name(\.replace\(\/\\s\+\/g,\s*'_'\))?/g, '($1.name.substring(0, $1.name.lastIndexOf(\\'.\\')) || $1.name)$2');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed precedence in:', filePath);
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
