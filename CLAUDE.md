# Fairy Frills Virtual Try-On Theme - Developer Guide

## Project Overview
This is a Shopify theme for "Fairy Frills" children's fashion brand with integrated AI-powered virtual try-on functionality. The theme allows customers to upload photos and see how clothing items look on kids in real-time using Fash.AI API and Cloudinary for image hosting.

## Tech Stack
- **Framework**: Shopify Liquid templating + Custom Web Components (ES6)
- **API Integration**: 
  - Fash.AI (https://api.fashn.ai/v1) - Virtual try-on generation
  - Cloudinary - Image upload and hosting
- **Image Processing**: FileReader API, base64 encoding, Blob conversion
- **Version Control**: Git + GitHub (https://github.com/Adityatechdome/fairyfrillswithclaude)

## Project Structure

```
final theme shopify/
├── assets/
│   ├── virtual-tryon-api.js          # Main API client class
│   ├── virtual-tryon.js              # Block-level JS logic
│   └── ... (other theme assets)
├── blocks/
│   ├── ai_gen_block_33f0b4d.liquid   # Kids virtual try-on upload UI
│   ├── virtual-tryon-with-api.liquid # Product page try-on block
│   └── ... (other blocks)
├── sections/
│   ├── search-virtual-tryon.liquid   # Search page try-on section
│   └── ... (other sections)
├── templates/
│   ├── page.virtual-try-on.json      # Dedicated virtual try-on page
│   ├── search.json                   # Search results with try-on
│   └── ... (other templates)
└── config/
    └── settings_schema.json           # Theme configuration
```

## Key Files & Responsibilities

### Core Virtual Try-On Implementation

**assets/virtual-tryon-api.js**
- `VirtualTryOnAPI` class - Main API client
- Methods:
  - `generateVirtualTryOn(payload)` - Calls Fash.AI API
  - `uploadImage(base64Image)` - Uploads to Fash.AI
  - `uploadToCloudinary(imageData, filename)` - Unsigned Cloudinary upload
  - `dataUrlToBlob(dataUrl)` - Converts base64 to Blob
  - `fetchWithTimeout(url, options)` - Wrapper with timeout handling
- Constructor options:
  ```javascript
  {
    apiKey: 'fash.ai-api-key',
    apiBaseUrl: 'https://api.fashn.ai/v1',
    cloudinaryCloudName: '386471482775984',
    cloudinaryUploadPreset: 'virtual_tryon',
    timeout: 30000
  }
  ```

**blocks/ai_gen_block_33f0b4d.liquid**
- Dedicated kids virtual try-on block
- Custom element: `<kids-virtual-tryon-{id}>`
- Features:
  - Photo upload with drag & drop
  - Image preview
  - Size selection (0-3M to 11-12Y)
  - Product multi-select with search
  - Fully customizable colors & typography in theme editor
- Schema settings available for customization (colors, text, sizing)

**blocks/virtual-tryon-with-api.liquid**
- Inline try-on block for product pages
- Custom element: `<virtual-tryon-{id}>`
- Displays results from API
- Background Cloudinary upload (non-blocking)

**sections/search-virtual-tryon.liquid**
- Search results page try-on section
- Custom element: `<search-virtual-tryon-{id}>`
- Similar to product block with search integration
- Background archiving after results display

## API Configuration

### Fash.AI Setup
1. Get API key from Fash.AI dashboard
2. Add to Shopify theme settings: `fash-ai-api-key` meta tag
3. API endpoint: `https://api.fashn.ai/v1/virtual-tryon/generate`
4. Payload structure:
   ```javascript
   {
     image: 'base64-image-or-url',
     size: '6-9M', // or other sizes
     products: ['product-id-1', 'product-id-2'],
     metadata: {
       timestamp: ISO8601,
       source: 'shopify-theme'
     }
   }
   ```

### Cloudinary Setup
1. Cloud name: `386471482775984`
2. Upload preset: `virtual_tryon` (unsigned)
3. Folder: `virtual-try-on`
4. Uses unsigned upload (no API key exposed on client)

## Important Code Patterns

### Custom Element Pattern
All virtual try-on components use ES6 custom elements:
```javascript
class VirtualTryOnComponent extends HTMLElement {
  constructor() {
    super();
    // Initialize properties
  }
  
  connectedCallback() {
    // Set up event listeners when element is added to DOM
    this.setupUpload();
    this.setupSelection();
  }
}

customElements.define('virtual-tryon-{id}', VirtualTryOnComponent);
```

**Critical Fix Applied**: Custom elements MUST use their tag name in HTML, not `<div>`. For example:
- ✅ `<virtual-tryon-abc123>`
- ❌ `<div class="virtual-tryon-abc123">`

### Image Upload & Processing
1. FileReader API reads file as base64 data URL
2. Convert to Blob for Cloudinary upload
3. Separate data flow for Fash.AI and Cloudinary

### Background Archiving Pattern
```javascript
async archiveToCloudinary(imageUrl) {
  try {
    // Non-blocking upload in background
    await api.uploadToCloudinary(imageUrl, `tryon-${Date.now()}`);
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.error('Archive failed:', error);
  }
}
```

## Workflow & Git

### Branch Strategy
- Main branch: `main` (production)
- All development merged via commits
- Each feature/fix gets its own commit with descriptive message

### Commit Messages
Follow this format:
```
[TYPE] Brief description

Detailed explanation if needed

TYPE can be:
- feat: New feature
- fix: Bug fix
- refactor: Code restructuring
- docs: Documentation
- style: Styling changes
- api: API integration changes
```

### Push Workflow
```bash
cd "final theme shopify"
git add .
git commit -m "[feat] Description of changes"
git pull origin main          # Always pull before push
git push origin main
```

## Common Tasks

### Adding a New Product
1. Upload product images to Shopify
2. Add Fash.AI product size mappings
3. Product ID will be available in Shopify admin

### Customizing Virtual Try-On Colors
1. Go to Shopify theme editor
2. Customize the block section
3. Adjust accent color, text color, borders, etc.
4. All settings available in block schema

### Debugging Upload Issues
1. Check browser console for errors
2. Verify API key is set in meta tag
3. Check file size (should be reasonable)
4. Check image format (must be image/*)
5. Verify custom element is instantiated (check DOM)

### Testing New Features
1. Push to GitHub
2. Test locally via Shopify CLI or theme preview
3. Verify on both desktop and mobile
4. Check console for JavaScript errors
5. Test all API flows (upload, generation, archiving)

## Performance Considerations
- Fash.AI processing can take 10-30 seconds
- Cloudinary upload happens in background (non-blocking)
- Image size should be optimized (compress before upload)
- Timeout is set to 30 seconds for API calls
- Multiple requests should use Promise.all() for efficiency

## Security Notes
- Cloudinary upload is unsigned (no backend needed)
- API keys should be stored in Shopify theme settings, not hardcoded
- FileReader API is secure (user must select file)
- No sensitive data is stored in localStorage
- HTTPS enforced for all API calls

## Responsive Design
- Desktop: 2-column layout (upload + selection)
- Mobile (≤768px): Stacked single column
- All buttons and controls scale appropriately
- Touch-friendly spacing and targets

## Future Enhancement Ideas
- [ ] Multiple photo uploads
- [ ] Try-on history/saved results
- [ ] Social sharing for results
- [ ] AR preview integration
- [ ] Advanced size matching algorithm
- [ ] Product recommendations based on try-on
- [ ] Analytics tracking for try-on usage

## Support & Documentation
- GitHub Repo: https://github.com/Adityatechdome/fairyfrillswithclaude
- API Docs: Fash.AI and Cloudinary official documentation
- Shopify Dev Docs: https://shopify.dev/docs

## Contact & Handoff
When handing off to another developer:
1. Provide Fash.AI API key securely
2. Ensure Cloudinary account access
3. Share GitHub repository access
4. Review this CLAUDE.md file together
5. Walk through the blocks/API integration once
