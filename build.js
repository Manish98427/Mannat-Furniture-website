/**
 * Mannat Furniture — Auto Index Builder
 * ---------------------------------------
 * This script runs automatically every time Netlify rebuilds the site.
 * It scans each content folder and generates an index.json file listing
 * all entries — so you NEVER need to manually update any index file.
 *
 * Just publish products/reviews/projects in the admin panel and they
 * will automatically appear on the live website. That's it!
 */

const fs   = require('fs');
const path = require('path');

const COLLECTIONS = [
  'content/products',
  'content/projects',
  'content/reviews',
];

COLLECTIONS.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Created folder: ${folder}`);
  }

  // Find all .md and .json files (skip index.json itself)
  const files = fs.readdirSync(folder).filter(f =>
    (f.endsWith('.md') || f.endsWith('.json')) && f !== 'index.json'
  );

  // Strip the extension to get the slug (e.g. "modern-wooden-tv-unit")
  const slugs = files.map(f => f.replace(/\.(md|json)$/, ''));

  // Write index.json
  const indexPath = path.join(folder, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(slugs, null, 2));
  console.log(`✅ ${folder}/index.json → [${slugs.join(', ')}]`);
});

console.log('\n🎉 Build complete — all indexes updated automatically!');
