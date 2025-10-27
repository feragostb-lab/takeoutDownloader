// Content script for Google Takeout Downloader
console.log('Takeout Downloader extension loaded');

// Function to find download links
function findDownloadLinks() {
  const links = [];
  const allLinks = document.querySelectorAll('a');
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    if (linkText.includes('descargar') || linkText.includes('download')) {
      const href = link.getAttribute('href');
      if (href) {
        links.push({
          text: link.textContent.trim(),
          url: href,
          element: link
        });
      }
    }
  });
  
  return links;
}

// Function to highlight download links
function highlightDownloadLinks() {
  const links = findDownloadLinks();
  links.forEach(linkObj => {
    linkObj.element.style.border = '2px solid #4CAF50';
    linkObj.element.style.backgroundColor = '#e8f5e9';
    linkObj.element.style.padding = '2px 4px';
  });
  return links.length;
}

// Function to download all links
function downloadAllLinks() {
  const links = findDownloadLinks();
  let downloadCount = 0;
  
  links.forEach((linkObj, index) => {
    // Add delay to avoid overwhelming the browser
    setTimeout(() => {
      const fullUrl = new URL(linkObj.url, window.location.href).href;
      console.log(`Downloading: ${fullUrl}`);
      
      // Create a temporary anchor element to trigger download
      const tempLink = document.createElement('a');
      tempLink.href = fullUrl;
      tempLink.download = ''; // This suggests to download instead of navigate
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      downloadCount++;
    }, index * 1000); // 1 second delay between downloads
  });
  
  return links.length;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'findLinks') {
    const links = findDownloadLinks();
    sendResponse({ count: links.length, links: links.map(l => ({ text: l.text, url: l.url })) });
  } else if (request.action === 'highlightLinks') {
    const count = highlightDownloadLinks();
    sendResponse({ count: count });
  } else if (request.action === 'downloadAll') {
    const count = downloadAllLinks();
    sendResponse({ count: count });
  }
  return true; // Keep the message channel open for async response
});

// Auto-highlight links on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const count = highlightDownloadLinks();
    if (count > 0) {
      console.log(`Found and highlighted ${count} download links`);
    }
  }, 1000);
});
