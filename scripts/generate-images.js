const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateImages() {
  const logoPath = path.join(__dirname, '../assets/nstreamLogo.png');
  const publicDir = path.join(__dirname, '../public');
  const imagesDir = path.join(publicDir, 'images');

  // Ensure images directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Generate favicon.ico (48x48)
  await sharp(logoPath)
    .resize(48, 48)
    .toFile(path.join(publicDir, 'favicon.ico'));

  // Generate apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180)
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Generate OG image (1200x630)
  // Create a white canvas
  const ogImage = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(200, 200)
          .toBuffer(),
        gravity: 'northwest',
        top: 50,
        left: 50
      }
    ])
    .jpeg()
    .toFile(path.join(imagesDir, 'nstream-og-image.jpg'));
}

generateImages().catch(console.error); 