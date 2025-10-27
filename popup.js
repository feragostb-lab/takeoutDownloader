// Popup script for Takeout Downloader
document.addEventListener('DOMContentLoaded', () => {
  const findBtn = document.getElementById('findBtn');
  const highlightBtn = document.getElementById('highlightBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const statusDiv = document.getElementById('status');
  const linkInfo = document.getElementById('linkInfo');

  // Check if we're on the correct page
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url && currentTab.url.includes('takeout.google.com/manage/archive')) {
      linkInfo.innerHTML = '<p class="success">✓ You are on the Google Takeout page</p>';
    } else {
      linkInfo.innerHTML = '<p class="warning">⚠ Please navigate to takeout.google.com/manage/archive</p>';
    }
  });

  // Find links button
  findBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findLinks' }, (response) => {
        if (response && response.count) {
          let message = `Found ${response.count} link(s)`;
          if (response.downloaded !== undefined && response.toDownload !== undefined) {
            message += ` (${response.downloaded} downloaded, ${response.toDownload} to download)`;
          }
          statusDiv.textContent = message;
          statusDiv.className = 'status success';
        } else {
          statusDiv.textContent = 'No download links found';
          statusDiv.className = 'status warning';
        }
      });
    });
  });

  // Highlight links button
  highlightBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'highlightLinks' }, (response) => {
        if (response && response.count) {
          statusDiv.textContent = `Highlighted ${response.count} link(s)`;
          statusDiv.className = 'status success';
        } else {
          statusDiv.textContent = 'No links to highlight';
          statusDiv.className = 'status warning';
        }
      });
    });
  });

  // Download all button
  downloadBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'downloadAll' }, (response) => {
        if (response && response.count) {
          statusDiv.textContent = `Starting download of ${response.count} file(s)...`;
          statusDiv.className = 'status success';
        } else {
          statusDiv.textContent = 'No files to download';
          statusDiv.className = 'status warning';
        }
      });
    });
  });
});
