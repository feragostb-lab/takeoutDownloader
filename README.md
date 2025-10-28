# Takeout Downloader

A Chrome extension to automate downloading files from Google Takeout.

## Quick Start

1. Load the extension in Chrome (see [INSTALL.md](INSTALL.md) for detailed instructions)
2. Navigate to [https://takeout.google.com/manage/archive](https://takeout.google.com/manage/archive)
3. Click the extension icon and press "Download All"

## Features

- 🔍 Automatically finds download links (supports "download" and "descargar" text)
- 🎯 Highlights links for easy identification
- ⬇️ One-click batch download
- 📊 Detects already downloaded files and skips them (supports aria-label detection in multiple languages)
- ✨ Clean, intuitive interface

## Testing

To test the extension's link detection functionality:

```bash
node testDemo.js
```

or

```bash
npm test
```

This will test the `GoogleTakeoutDemo.html` file and verify:
- Total links found: 131
- Already downloaded: 54
- To download: 77

## Installation

See [INSTALL.md](INSTALL.md) for complete installation and usage instructions.

## Quick Install (Developer Mode)

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select this folder

---

For detailed documentation, troubleshooting, and technical details, see [INSTALL.md](INSTALL.md).
