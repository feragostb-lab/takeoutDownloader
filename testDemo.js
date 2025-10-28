#!/usr/bin/env node
/**
 * Test script for GoogleTakeoutDemo.html
 * This script tests the link detection functionality on the demo HTML file
 * Expected results:
 * - Total links: 155
 * - Downloaded links: 54
 * - To download links: 101
 */

const fs = require('fs');
const path = require('path');

// Parse HTML and find download links (simulating the content.js logic)
function findDownloadLinks(document) {
  const links = [];
  const allLinks = document.querySelectorAll('a');
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    const ariaLabel = link.getAttribute('aria-label');
    const jsname = link.getAttribute('jsname');
    const isDownloaded = link.hasAttribute('data-downloaded') && link.getAttribute('data-downloaded') === 'true';
    const hasDownloadedClass = link.classList.contains('downloaded');
    
    // Check if aria-label indicates already downloaded (re-download labels)
    // Supports multiple languages: Spanish, English, and common variations
    const hasRedownloadAriaLabel = ariaLabel && (
      ariaLabel.toLowerCase().includes('volver a descargar') || // Spanish: "Re-download"
      ariaLabel.toLowerCase().includes('re-download') ||         // English: "Re-download"
      ariaLabel.toLowerCase().includes('redownload') ||          // English variation
      ariaLabel.toLowerCase().includes('descargar de nuevo') ||  // Spanish variation
      ariaLabel.toLowerCase().includes('download again')         // English variation
    );
    
    // Use jsname and class attributes for more robust link detection
    // jsname="hSRGPd" identifies Google Takeout download buttons
    // Check href contains download to filter out non-download links with same jsname
    const matchesJsname = jsname === 'hSRGPd';
    const matchesDownloadUrl = href && href.includes('/download');
    
    if (matchesJsname && matchesDownloadUrl && href) {
      links.push({
        text: link.textContent.trim(),
        url: href,
        downloaded: isDownloaded || hasDownloadedClass || hasRedownloadAriaLabel
      });
    }
  });
  
  return links;
}

// Main test function
async function runTest() {
  console.log('='.repeat(60));
  console.log('Google Takeout Demo Test');
  console.log('='.repeat(60));
  console.log();

  const htmlPath = path.join(__dirname, 'GoogleTakeoutDemo.html');
  
  // Check if file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: GoogleTakeoutDemo.html not found!');
    console.error(`   Expected path: ${htmlPath}`);
    process.exit(1);
  }

  console.log('✓ Found GoogleTakeoutDemo.html');
  console.log();

  // Read and parse HTML
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Use JSDOM if available, otherwise use a simple regex-based parser
  let links = [];
  
  try {
    // Try to use JSDOM
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    links = findDownloadLinks(document);
  } catch (e) {
    // Fallback: Parse HTML with regex (simpler but less robust)
    console.log('ℹ JSDOM not available, using fallback parser');
    // Updated regex to capture all attributes including jsname
    const linkRegex = /<a\s+([^>]*)>([^<]*)<\/a>/gi;
    let match;
    
    while ((match = linkRegex.exec(htmlContent)) !== null) {
      const [, attributes, text] = match;
      
      // Extract attributes
      const hrefMatch = attributes.match(/href="([^"]*)"/);
      const classMatch = attributes.match(/class="([^"]*)"/);
      const dataDownloadedMatch = attributes.match(/data-downloaded="([^"]*)"/);
      const ariaLabelMatch = attributes.match(/aria-label="([^"]*)"/);
      const jsnameMatch = attributes.match(/jsname="([^"]*)"/);
      
      const href = hrefMatch ? hrefMatch[1] : null;
      const className = classMatch ? classMatch[1] : '';
      const dataDownloaded = dataDownloadedMatch ? dataDownloadedMatch[1] : '';
      const ariaLabel = ariaLabelMatch ? ariaLabelMatch[1] : '';
      const jsname = jsnameMatch ? jsnameMatch[1] : '';
      
      // Use jsname and class attributes for more robust link detection
      // jsname="hSRGPd" identifies Google Takeout download buttons
      // Check href contains download to filter out non-download links with same jsname
      const matchesJsname = jsname === 'hSRGPd';
      const matchesDownloadUrl = href && href.includes('/download');
      
      if (matchesJsname && matchesDownloadUrl && href) {
        // Check if aria-label indicates already downloaded (re-download labels)
        const hasRedownloadAriaLabel = ariaLabel && (
          ariaLabel.toLowerCase().includes('volver a descargar') ||
          ariaLabel.toLowerCase().includes('re-download') ||
          ariaLabel.toLowerCase().includes('redownload') ||
          ariaLabel.toLowerCase().includes('descargar de nuevo') ||
          ariaLabel.toLowerCase().includes('download again')
        );
        
        links.push({
          text: text.trim(),
          url: href,
          downloaded: dataDownloaded === 'true' || className.includes('downloaded') || hasRedownloadAriaLabel
        });
      }
    }
  }

  // Calculate statistics
  const totalLinks = links.length;
  const downloadedLinks = links.filter(l => l.downloaded).length;
  const toDownloadLinks = totalLinks - downloadedLinks;

  // Display results
  console.log('Test Results:');
  console.log('-'.repeat(60));
  console.log(`Total links found:        ${totalLinks}`);
  console.log(`Already downloaded:       ${downloadedLinks}`);
  console.log(`To download:              ${toDownloadLinks}`);
  console.log();

  // Verify expected values
  const expectedTotal = 131;
  const expectedDownloaded = 54;
  const expectedToDownload = 77;

  let allTestsPassed = true;

  console.log('Validation:');
  console.log('-'.repeat(60));
  
  if (totalLinks === expectedTotal) {
    console.log(`✓ Total links: ${totalLinks} (expected ${expectedTotal})`);
  } else {
    console.log(`✗ Total links: ${totalLinks} (expected ${expectedTotal})`);
    allTestsPassed = false;
  }

  if (downloadedLinks === expectedDownloaded) {
    console.log(`✓ Downloaded: ${downloadedLinks} (expected ${expectedDownloaded})`);
  } else {
    console.log(`✗ Downloaded: ${downloadedLinks} (expected ${expectedDownloaded})`);
    allTestsPassed = false;
  }

  if (toDownloadLinks === expectedToDownload) {
    console.log(`✓ To download: ${toDownloadLinks} (expected ${expectedToDownload})`);
  } else {
    console.log(`✗ To download: ${toDownloadLinks} (expected ${expectedToDownload})`);
    allTestsPassed = false;
  }

  console.log();
  console.log('='.repeat(60));
  
  if (allTestsPassed) {
    console.log('✓ ALL TESTS PASSED');
    console.log('='.repeat(60));
    process.exit(0);
  } else {
    console.log('✗ SOME TESTS FAILED');
    console.log('='.repeat(60));
    process.exit(1);
  }
}

// Run the test
runTest().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
