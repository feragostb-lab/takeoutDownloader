// Content script for Google Takeout Downloader
console.log('Takeout Downloader extension loaded');

// Function to find download links
function findDownloadLinks() {
  const links = [];
  const allLinks = document.querySelectorAll('a');
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    const href = link.getAttribute('href');
    const isDownloaded = link.hasAttribute('data-downloaded') && link.getAttribute('data-downloaded') === 'true';
    const hasDownloadedClass = link.classList.contains('downloaded');
    
    // Check if link matches download criteria:
    // 1. Text contains "descargar" or "download"
    // 2. URL contains takeout.google.com/download
    // 3. URL contains /download? pattern
    const matchesText = linkText.includes('descargar') || linkText.includes('download');
    const matchesUrl = href && (
      href.includes('takeout.google.com/download') ||
      href.includes('/download?')
    );
    
    if ((matchesText || matchesUrl) && href) {
      links.push({
        text: link.textContent.trim(),
        url: href,
        element: link,
        downloaded: isDownloaded || hasDownloadedClass
      });
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
  // Filter out already downloaded links
  const linksToDownload = links.filter(linkObj => !linkObj.downloaded);
  let downloadCount = 0;
  
  linksToDownload.forEach((linkObj, index) => {
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
  
  return linksToDownload.length;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'findLinks') {
    const links = findDownloadLinks();
    const downloaded = links.filter(l => l.downloaded).length;
    const toDownload = links.length - downloaded;
    sendResponse({ 
      count: links.length,
      downloaded: downloaded,
      toDownload: toDownload,
      links: links.map(l => ({ text: l.text, url: l.url, downloaded: l.downloaded })) 
    });
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
