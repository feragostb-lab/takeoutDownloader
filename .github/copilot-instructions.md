# Takeout Downloader - GitHub Copilot Instructions

## Project Overview
This is a Chrome extension that automates downloading files from Google Takeout. The extension helps users batch-download their archive files from Google's data export service.

**Tech Stack:**
- Chrome Extension (Manifest V3)
- Vanilla JavaScript (no framework)
- HTML/CSS for popup UI
- Node.js for testing (jsdom)

**Target Browser:** Chrome and Chromium-based browsers
**Target Website:** https://takeout.google.com/manage/archive

## File Structure
```
takeoutDownloader/
├── manifest.json       # Extension configuration (Manifest V3)
├── content.js          # Content script - runs on takeout.google.com
├── popup.html          # Extension popup UI
├── popup.js            # Popup functionality and event handlers
├── popup.css           # Gradient styling for popup
├── icons/              # Extension icons (16x16, 48x48, 128x128)
├── testDemo.js         # Test script for link detection
├── GoogleTakeoutDemo.html  # Demo HTML file for testing
├── README.md           # Quick start guide
├── INSTALL.md          # Comprehensive installation guide
├── ARCHITECTURE.md     # Technical architecture documentation
└── .github/            # GitHub configuration
```

## Coding Standards

### JavaScript Style
- Use modern ES6+ syntax (arrow functions, const/let, template literals)
- Use camelCase for variables and functions
- Use descriptive variable names
- Add comments for complex logic, especially regex patterns and detection logic
- Follow the existing code style in the repository

### Chrome Extension Best Practices
- Use Manifest V3 standards (required for modern Chrome extensions)
- Keep permissions minimal (currently: downloads, activeTab)
- Use content scripts for page interaction
- Use message passing between popup and content scripts
- Follow Chrome's security best practices (no inline scripts, CSP compliant)

### Error Handling
- Always validate URLs before processing
- Check for null/undefined values when accessing DOM elements
- Use optional chaining (?.) when appropriate
- Handle edge cases (empty pages, missing elements, etc.)

## Key Features & Implementation

### Link Detection Logic
The extension finds download links using multiple criteria:
1. Text content includes "descargar" or "download"
2. URL contains "takeout.google.com/download" or "/download?"
3. Must have a valid href attribute

**Important:** Support both English and Spanish language variations.

### Already Downloaded Detection
Multiple methods to detect already downloaded files:
1. `data-downloaded="true"` attribute
2. `downloaded` CSS class
3. aria-label containing re-download indicators in multiple languages:
   - Spanish: "volver a descargar", "descargar de nuevo"
   - English: "re-download", "redownload", "download again"

### Download Implementation
- Use DOM manipulation to trigger downloads (create temporary anchor element)
- Add 1-second delay between downloads to avoid overwhelming the browser
- Filter out already downloaded files before starting download process

## Testing

### Running Tests
```bash
npm test
# or
node testDemo.js
```

### Expected Test Results
- Total links found: 160
- Already downloaded: 59
- To download: 101

### Test Implementation
- Tests use jsdom when available (fallback to regex parser)
- Test script simulates content.js logic on GoogleTakeoutDemo.html
- All logic in testDemo.js should mirror logic in content.js

**Important:** When modifying link detection logic in content.js, update testDemo.js accordingly to maintain test accuracy.

## Security & Privacy

### Required Security Practices
- ✅ No external server communication
- ✅ No data collection or tracking
- ✅ No storage of user data
- ✅ Only runs on Google Takeout domain
- ✅ Minimal permissions requested
- ❌ Never add telemetry or analytics
- ❌ Never store or transmit user data
- ❌ Never include external scripts or libraries

### Chrome Extension Security
- All code must be CSP (Content Security Policy) compliant
- No inline JavaScript in HTML files
- No eval() or new Function()
- Validate all URLs before processing
- Use secure message passing between components

## Build & Deployment

### No Build Process
This extension has no build step - files are used directly. Don't add build tools like webpack or bundlers unless absolutely necessary.

### Installation (Development Mode)
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the repository folder

### Files to Exclude
The following files/folders should NOT be modified or considered for code generation:
- `node_modules/` (dependencies)
- `.git/` (version control)
- `.vscode/`, `.idea/` (editor configs)
- `dist/`, `build/` (if created)
- `*.log`, `*.tmp` (temporary files)
- `GoogleTakeoutDemo.html` and `GoogleTakeoutDemo_files/` (test fixtures - these are snapshots of actual Google Takeout pages used for testing)

## Documentation Standards

### Code Comments
- Add comments for non-obvious logic
- Document regex patterns and complex conditions
- Explain language-specific detection patterns
- Use JSDoc-style comments for functions if adding new ones

### README Updates
- Keep README.md concise (quick start guide)
- Put detailed documentation in INSTALL.md
- Update ARCHITECTURE.md for structural changes
- Include examples in documentation

## Multi-language Support

### Current Language Support
- English: "download", "re-download", "redownload", "download again"
- Spanish: "descargar", "volver a descargar", "descargar de nuevo"

### Adding New Languages
When adding support for additional languages:
1. Update link detection in content.js
2. Update aria-label detection patterns
3. Update testDemo.js to match
4. Document the new language in ARCHITECTURE.md
5. Update README.md with supported languages

## UI/UX Guidelines

### Popup Design
- Maintain the purple-to-blue gradient background
- Use white content cards with shadows
- Keep buttons color-coded: blue (find), orange (highlight), green (download)
- Ensure responsive hover effects
- Maintain clean, minimal design

### Visual Feedback
- Highlight download links with green border (#4CAF50)
- Use light green background (#e8f5e9) for highlighted links
- Show clear status messages
- Display counts (total, downloaded, to download)

## Common Tasks

### Modifying Link Detection
1. Update findDownloadLinks() in content.js
2. Update corresponding logic in testDemo.js
3. Test with npm test
4. Verify on actual Google Takeout page

### Changing Download Behavior
1. Modify downloadAllLinks() in content.js
2. Consider browser limitations (pop-up blockers, download limits)
3. Test with small batches first
4. Document any changes in ARCHITECTURE.md

### Adding New Features
1. Check if it requires new permissions in manifest.json
2. Update all relevant documentation
3. Add tests if applicable
4. Maintain backward compatibility
5. Keep changes minimal and focused

## Troubleshooting

### Common Issues
- Links not detected: Check if page is fully loaded, try refreshing
- Downloads don't start: Check Chrome download settings, pop-up permissions
- Wrong link count: Verify aria-label detection patterns match current Google UI

### Debugging
- Use console.log statements (already present in content.js)
- Check Chrome DevTools console for errors
- Test with GoogleTakeoutDemo.html before testing on actual Takeout page
- Use "Highlight Links" button to visually verify detection

## Performance Considerations

- Keep DOM queries efficient (use querySelectorAll once)
- Don't add unnecessary dependencies
- Maintain 1-second delay between downloads (browser limitation)
- Auto-highlight on page load has 1-second delay (wait for page to settle)

## Maintenance Guidelines

### Keep It Simple
- This is a lightweight extension - avoid over-engineering
- Don't add frameworks unless absolutely necessary
- Prefer vanilla JavaScript over libraries
- Maintain zero-dependency approach (except jsdom for tests)

### Version Updates
- Update version in manifest.json
- Update version in package.json
- Document changes in commit messages
- Test thoroughly before releasing

## Contact & Contribution
- Open source project - contributions welcome
- Follow existing code style and patterns
- Test changes thoroughly
- Update documentation with code changes
