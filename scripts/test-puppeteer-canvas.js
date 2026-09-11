const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', channel: 'chrome' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  
  console.log('Navigating to product page...');
  const response = await page.goto('https://forpencil.com/product/doms-colour-pencils-50shades/', { waitUntil: 'networkidle2' });
  
  console.log('Response status:', response.status());
  
  const base64Img = await page.evaluate(async () => {
    const img = document.querySelector('.woocommerce-product-gallery__image img');
    if (!img) return null;
    
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    
    // Draw the image
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Get base64
    return canvas.toDataURL('image/jpeg', 0.9);
  });
  
  console.log('Image extracted:', base64Img ? `Yes, length: ${base64Img.length}` : 'No');
  
  await browser.close();
})();
