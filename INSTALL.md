# Takeout Downloader Chrome Extension

A Chrome extension to automate downloading files from Google Takeout (takeout.google.com/manage/archive).

## Features

- 🔍 Automatically finds download links with "descargar" or "download" text
- 🎯 Highlights download links on the page for easy identification
- ⬇️ One-click download of all available files
- ✨ Beautiful and intuitive user interface
- 🌐 Works specifically on Google Takeout archive page

## Installation

### Method 1: Load Unpacked Extension (For Development/Testing)

1. Download or clone this repository to your local machine
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" button
5. Select the folder containing the extension files (where manifest.json is located)
6. The Takeout Downloader extension should now appear in your extensions list

### Method 2: From Chrome Web Store (When Published)

*Coming soon - this extension will be available on the Chrome Web Store*

## Usage

1. **Navigate to Google Takeout**
   - Go to [https://takeout.google.com/manage/archive](https://takeout.google.com/manage/archive)
   - Make sure you have archives ready for download

2. **Open the Extension**
   - Click on the Takeout Downloader icon in your Chrome toolbar
   - A popup will appear with the extension interface

3. **Find Download Links**
   - Click "Find Download Links" to scan the page
   - The extension will show you how many download links it found

4. **Highlight Links (Optional)**
   - Click "Highlight Links" to visually mark all download links on the page
   - Links will be highlighted with a green border and background

5. **Download All Files**
   - Click "Download All" to start downloading all files
   - Downloads will start automatically with a 1-second delay between each file
   - Check your Chrome downloads (Ctrl+J or Cmd+J) to monitor progress

## Features Explained

### Auto-Highlight
The extension automatically highlights download links when you load the Google Takeout page, making them easy to spot.

### Smart Detection
The extension searches for links containing either "descargar" (Spanish for download) or "download" in their text, ensuring it works across different language settings.

### Staggered Downloads
To prevent overwhelming your browser, downloads are initiated with a 1-second delay between each file.

## Permissions

This extension requires the following permissions:

- **downloads**: To programmatically trigger file downloads
- **activeTab**: To interact with the current Google Takeout tab
- **host_permissions for takeout.google.com**: To run the content script only on Google Takeout pages

## File Structure

```
takeoutDownloader/
├── manifest.json          # Extension configuration
├── content.js            # Content script for finding and downloading links
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension manifest)
- **Content Script**: Runs on `takeout.google.com/manage/archive*`
- **Permissions**: Minimal permissions required for functionality
- **Browser Support**: Chrome (and Chromium-based browsers like Edge, Brave)

## Troubleshooting

### Extension doesn't appear
- Make sure you're on the correct page: `takeout.google.com/manage/archive`
- Try refreshing the page after installing the extension
- Check that the extension is enabled in `chrome://extensions/`

### No links found
- Ensure your Google Takeout archives are ready for download
- Try clicking "Highlight Links" to see if links are present on the page
- Some archives may use different button text - the extension looks for "download" or "descargar"

### Downloads don't start
- Check your Chrome download settings and permissions
- Make sure pop-ups and redirects are allowed for takeout.google.com
- Check if Chrome is blocking downloads (look for a blocked download icon in the address bar)

## Privacy

This extension:
- ✅ Only runs on Google Takeout pages
- ✅ Does not collect any user data
- ✅ Does not send data to external servers
- ✅ Only accesses the current tab when you use it
- ✅ All processing happens locally in your browser

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use and modify as needed.

## Support

If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

---

**Note**: This is an unofficial tool and is not affiliated with or endorsed by Google.
