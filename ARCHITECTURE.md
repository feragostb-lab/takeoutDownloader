# Chrome Extension Overview

## 🎯 Purpose
This Chrome extension automates downloading files from Google Takeout by finding and batch-downloading all available archive links.

## 📁 File Structure

```
takeoutDownloader/
├── manifest.json       # Extension configuration (Manifest V3)
├── content.js          # Content script - runs on takeout.google.com
├── popup.html          # Extension popup UI
├── popup.js            # Popup functionality and event handlers
├── popup.css           # Beautiful gradient styling
├── icons/              # Extension icons
│   ├── icon16.png      # Toolbar icon
│   ├── icon48.png      # Extension management icon
│   └── icon128.png     # Chrome Web Store icon
├── README.md           # Quick start guide
├── INSTALL.md          # Comprehensive documentation
└── .gitignore          # Git ignore rules
```

## 🔧 How It Works

### 1. Content Script (content.js)
- Automatically runs on `takeout.google.com/manage/archive*`
- Scans the page for links containing "download" or "descargar"
- Highlights found links with green borders
- Triggers downloads when requested

### 2. Popup Interface (popup.html + popup.js + popup.css)
- Shows current page status
- Provides three action buttons:
  - **Find Download Links**: Counts available downloads
  - **Highlight Links**: Marks links with visual indicators
  - **Download All**: Starts batch download process

### 3. Manifest Configuration (manifest.json)
- Uses Manifest V3 (latest standard)
- Minimal permissions required:
  - `downloads`: For programmatic downloads
  - `activeTab`: For page interaction
  - Host permission for `takeout.google.com`

## 🎨 Key Features

### Automatic Link Detection
```javascript
// Finds links using stable Google attributes (more robust than text/URL matching)
const jsname = link.getAttribute('jsname');
const matchesJsname = jsname === 'hSRGPd'; // Google's internal identifier for download buttons
const matchesDownloadUrl = href && href.includes('/download');
if (matchesJsname && matchesDownloadUrl && href) {
  // Process this link
}
```

### Already Downloaded Detection
```javascript
// Detects already downloaded files using multiple methods:
// 1. data-downloaded="true" attribute
// 2. "downloaded" CSS class
// 3. aria-label with re-download indicators in multiple languages
const hasRedownloadAriaLabel = ariaLabel && (
  ariaLabel.toLowerCase().includes('volver a descargar') || // Spanish
  ariaLabel.toLowerCase().includes('re-download') ||         // English
  ariaLabel.toLowerCase().includes('redownload') ||
  ariaLabel.toLowerCase().includes('descargar de nuevo') ||
  ariaLabel.toLowerCase().includes('download again')
);
```

### Visual Highlighting
```javascript
// Adds green border and background to download links
linkObj.element.style.border = '2px solid #4CAF50';
linkObj.element.style.backgroundColor = '#e8f5e9';
```

### Staggered Downloads
```javascript
// 1-second delay between downloads to prevent browser overload
setTimeout(() => {
  // Trigger download
}, index * 1000);
```

## 🚀 Usage Flow

1. **User visits Google Takeout**
   - Extension content script loads automatically
   - Links are auto-highlighted on page load

2. **User opens extension popup**
   - Sees current page status
   - Gets button options for actions

3. **User clicks "Download All"**
   - Extension finds all download links
   - Triggers each download with 1-second delays
   - User can monitor progress in Chrome downloads

## 🛡️ Security & Privacy

- ✅ No external server communication
- ✅ No data collection
- ✅ Runs only on Google Takeout domain
- ✅ Minimal permissions requested
- ✅ Open source and auditable

## 🎨 UI Design

The extension features a modern, gradient design:
- Purple-to-blue gradient background
- White content cards with shadows
- Color-coded buttons (blue, orange, green)
- Responsive hover effects
- Clear status messages

## 📝 Technical Notes

- **Manifest Version**: 3 (required for new Chrome extensions)
- **Target URL**: `https://takeout.google.com/manage/archive*`
- **Language Support**: English and Spanish ("download" and "descargar")
- **Browser Compatibility**: Chrome and Chromium-based browsers

## 🔄 Future Enhancements (Ideas)

- Add download progress tracking
- Support for more languages
- Download queue management
- Selective download (checkboxes for individual files)
- Download history log
- Customizable download delay settings
- Export download list to CSV

## 📦 Installation Summary

```bash
# Quick install in Chrome:
1. Open chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the extension folder
5. Done! 🎉
```

## 🐛 Known Limitations

- Requires Google Takeout page to be fully loaded
- Download delays are fixed at 1 second
- May need to allow multiple downloads in Chrome settings
- Cannot bypass Chrome's download limits/blocks

## 💡 Tips for Users

1. Make sure pop-ups are allowed for takeout.google.com
2. Check Chrome download settings if downloads don't start
3. Use "Highlight Links" first to verify links are detected
4. Monitor Chrome downloads (Ctrl+J) to see progress
5. Refresh the page if links aren't detected initially

---

**Status**: ✅ Complete and ready for use!
