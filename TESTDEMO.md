# TestDemo Feature Documentation

## Overview

The `testDemo` feature provides automated testing for the Google Takeout link detection functionality. It uses a realistic demo HTML file (`GoogleTakeoutDemo.html`) that simulates the actual Google Takeout download page structure.

## Files Added

### 1. GoogleTakeoutDemo.html
A realistic simulation of the Google Takeout download page with:
- **131 total download links** - representing multiple archive parts from a real saved Google Takeout page
- **54 links marked as downloaded** - simulating already completed downloads
- **77 links to download** - active download links
- Real Google Takeout page structure with embedded JavaScript data
- Uses authentic URL patterns and Google's dynamic rendering structure

### 2. GoogleTakeoutDemo_files/
A folder containing supporting resources for the real saved Google Takeout page, including JavaScript files, images, and other assets required for the page to function.

### 3. testDemo.js
An automated test script that:
- Parses the GoogleTakeoutDemo.html file
- Simulates the link detection logic from content.js
- Validates that the correct number of links are found
- Reports pass/fail status with detailed statistics

### 4. package.json
Provides npm scripts for easy test execution:
```json
{
  "scripts": {
    "test": "node testDemo.js",
    "test:demo": "node testDemo.js"
  }
}
```

## Improvements to content.js

The `content.js` file has been enhanced to better detect Google Takeout download links:

### Enhanced Link Detection
The `findDownloadLinks()` function now checks:
1. **Text-based detection**: Links containing "download" or "descargar" text
2. **URL-based detection**: Links with URLs containing:
   - `takeout.google.com/download`
   - `/download?` pattern
3. **Downloaded status detection**: 
   - `data-downloaded="true"` attribute
   - `downloaded` CSS class

### Filtering Downloaded Links
The `downloadAllLinks()` function now:
- Filters out links already marked as downloaded
- Only triggers downloads for links that haven't been downloaded yet
- Returns the count of links queued for download (not including already downloaded)

### Enhanced Response Data
The message listener now returns additional information:
```javascript
{
  count: 131,           // Total links found
  downloaded: 54,       // Already downloaded
  toDownload: 77,       // Remaining to download
  links: [...]          // Array with download status for each link
}
```

## Running the Tests

### Method 1: Using npm
```bash
npm test
```

### Method 2: Using node directly
```bash
node testDemo.js
```

### Method 3: Direct execution (if made executable)
```bash
./testDemo.js
```

## Expected Test Output

```
============================================================
Google Takeout Demo Test
============================================================

✓ Found GoogleTakeoutDemo.html

Test Results:
------------------------------------------------------------
Total links found:        131
Already downloaded:       54
To download:              77

Validation:
------------------------------------------------------------
✓ Total links: 131 (expected 131)
✓ Downloaded: 54 (expected 54)
✓ To download: 77 (expected 77)

============================================================
✓ ALL TESTS PASSED
============================================================
```

## popup.js Improvements

The popup now displays more detailed information when finding links:

**Before:**
```
Found 155 download link(s)
```

**After:**
```
Found 155 link(s) (54 downloaded, 101 to download)
```

## Testing the Extension with GoogleTakeoutDemo.html

To manually test the extension with the demo HTML:

1. **Load the extension** in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder

2. **Open GoogleTakeoutDemo.html** in Chrome:
   - Right-click on `GoogleTakeoutDemo.html`
   - Select "Open with Chrome" (or your browser)

3. **Test the extension**:
   - Click the extension icon
   - Click "Find Links" - should show: "Found 131 link(s) (54 downloaded, 77 to download)"
   - Click "Highlight Links" - should highlight all 131 links
   - Click "Download All" - should attempt to download only the 77 non-downloaded links

## Technical Details

### Link Detection Algorithm

```javascript
function findDownloadLinks() {
  const links = [];
  const allLinks = document.querySelectorAll('a');
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    const href = link.getAttribute('href');
    const isDownloaded = link.hasAttribute('data-downloaded') && 
                         link.getAttribute('data-downloaded') === 'true';
    const hasDownloadedClass = link.classList.contains('downloaded');
    
    // Match by text or URL pattern
    const matchesText = linkText.includes('descargar') || 
                       linkText.includes('download');
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
```

### Download Filtering

```javascript
function downloadAllLinks() {
  const links = findDownloadLinks();
  // Filter out already downloaded links
  const linksToDownload = links.filter(linkObj => !linkObj.downloaded);
  
  // Only download the filtered links
  linksToDownload.forEach((linkObj, index) => {
    setTimeout(() => {
      // Trigger download...
    }, index * 1000);
  });
  
  return linksToDownload.length;
}
```

## Compatibility

- **Browser Support**: Chrome/Chromium-based browsers with Manifest V3 support
- **Node.js**: Version 12+ required for running tests
- **No Dependencies**: testDemo.js uses only Node.js built-in modules (falls back to regex parsing if JSDOM is not available)

## Troubleshooting

### Test fails with incorrect numbers
1. Verify GoogleTakeoutDemo.html hasn't been modified
2. Re-generate the file if needed by running the generation script
3. Check that all 155 links have the correct structure

### Extension doesn't detect links
1. Ensure you're on a page that matches the detection criteria
2. Check browser console for errors
3. Verify the extension has loaded properly (check for console message)
4. Try reloading the extension in chrome://extensions/

## Future Enhancements

Possible improvements:
- Add JSDOM as a dev dependency for more accurate DOM parsing in tests
- Create additional test HTML files for different scenarios
- Add unit tests for individual functions
- Create E2E tests using Puppeteer or similar
