// Regenerates every launcher icon from the Spark Q mark.
// The shapes below mirror src/components/ui/Logo.tsx; colors are src/theme/colors.ts
// (ink / surface / coral). Re-run with `npm run icons` whenever the logo changes.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const INK = '#21212B';
const SURFACE = '#FFFFFF';
const CORAL = '#E2825B';

const root = path.resolve(import.meta.dirname, '..');

const mark = `
  <circle cx="54" cy="56" r="26" stroke="${SURFACE}" stroke-width="10" fill="none"/>
  <path d="M70 70l12 12" stroke="${SURFACE}" stroke-width="10" stroke-linecap="round"/>
  <path d="M92 60l-10 20h12l-10 20" stroke="${CORAL}" stroke-width="7"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

// Ink bounds of the mark within the 120 viewBox, stroke widths included. The
// mark is not centred in that box, so every variant re-centres it explicitly.
const BOX = { x: 23, y: 25, w: 74.5, h: 78.5 };
const cx = BOX.x + BOX.w / 2;
const cy = BOX.y + BOX.h / 2;

// Centre the mark on a `canvas`-sized artboard, scaled so its longest side is `target`.
const place = (canvas, target) => {
  const s = target / Math.max(BOX.w, BOX.h);
  return `translate(${canvas / 2 - cx * s} ${canvas / 2 - cy * s}) scale(${s})`;
};

const squircle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="32" fill="${INK}"/>
  <g transform="${place(120, 78.5)}">${mark}</g>
</svg>`;

// iOS masks its own corners and forbids alpha on the marketing icon.
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" fill="${INK}"/>
  <g transform="${place(120, 78.5)}">${mark}</g>
</svg>`;

// Adaptive foreground: the mark must stay inside the inner 66dp safe zone of 108dp.
const foreground = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">
  <g transform="${place(108, 62)}">${mark}</g>
</svg>`;

const render = (svg, size) =>
  sharp(Buffer.from(svg), { density: 1024 }).resize(size, size);

const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const res = path.join(root, 'android/app/src/main/res');

for (const [bucket, scale] of Object.entries(DENSITIES)) {
  const dir = path.join(res, `mipmap-${bucket}`);
  await mkdir(dir, { recursive: true });
  for (const name of ['ic_launcher', 'ic_launcher_round']) {
    await render(squircle, Math.round(48 * scale)).webp({ lossless: true })
      .toFile(path.join(dir, `${name}.webp`));
  }
  await render(foreground, Math.round(108 * scale)).webp({ lossless: true })
    .toFile(path.join(dir, 'ic_launcher_foreground.webp'));
}

await render(squircle, 512).png()
  .toFile(path.join(root, 'android/app/src/main/ic_launcher-playstore.png'));

const IOS = [
  ['20x20', '2x', 40], ['20x20', '3x', 60],
  ['29x29', '2x', 58], ['29x29', '3x', 87],
  ['40x40', '2x', 80], ['40x40', '3x', 120],
  ['60x60', '2x', 120], ['60x60', '3x', 180],
];
const appIcon = path.join(root, 'ios/Quizkr/Images.xcassets/AppIcon.appiconset');
await mkdir(appIcon, { recursive: true });

const images = [];
for (const [size, scale, px] of IOS) {
  const filename = `Icon-${size.split('x')[0]}@${scale}.png`;
  await render(square, px).png().toFile(path.join(appIcon, filename));
  images.push({ filename, idiom: 'iphone', scale, size });
}
await render(square, 1024).flatten({ background: INK }).png()
  .toFile(path.join(appIcon, 'Icon-1024.png'));
images.push({
  filename: 'Icon-1024.png', idiom: 'ios-marketing', scale: '1x', size: '1024x1024',
});

await writeFile(
  path.join(appIcon, 'Contents.json'),
  JSON.stringify({ images, info: { author: 'xcode', version: 1 } }, null, 2) + '\n',
);

console.log(`Generated Android mipmaps + ${images.length} iOS icons.`);
