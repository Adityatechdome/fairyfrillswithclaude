# Fairy Frills Virtual Try-On Theme - Deployment Guide

## Quick Start Checklist
- [ ] Download theme from GitHub
- [ ] Upload theme to Shopify
- [ ] Configure API keys
- [ ] Set up products
- [ ] Test upload functionality
- [ ] Test size selection
- [ ] Test product selection
- [ ] Test try-on generation
- [ ] Verify Cloudinary archiving

---

## Step 1: Download & Upload Theme to Shopify

### Option A: Using Shopify Admin (Easiest)
1. Go to your **Shopify Admin** → **Sales Channels** → **Online Store** → **Themes**
2. Click **Add theme** → **Upload theme**
3. Download the theme from GitHub:
   ```
   https://github.com/Adityatechdome/fairyfrillswithclaude
   ```
4. Click the green **Code** button → **Download ZIP**
5. In Shopify, click **Choose file** and select the downloaded ZIP
6. Click **Upload**
7. Wait for upload to complete (should show your new theme)

### Option B: Using Shopify CLI (For developers)
```bash
# Install Shopify CLI if not already installed
npm install -g @shopify/cli

# Navigate to theme directory
cd "final theme shopify"

# Login to your store
shopify theme pull --store your-store.myshopify.com

# Deploy to store
shopify theme push -d --store your-store.myshopify.com
```

---

## Step 2: Configure API Keys

### 2.1 Get Fash.AI API Key

1. Sign up at: https://www.fashn.ai/
2. Go to **Dashboard** → **Settings** → **API Keys**
3. Copy your API key

### 2.2 Get Cloudinary Credentials

You already have these configured:
- **Cloud Name**: `386471482775984`
- **Upload Preset**: `virtual_tryon` (unsigned)

If you want to use your own Cloudinary account:
1. Sign up at: https://cloudinary.com/
2. Go to **Settings** → **Upload** → **Add upload preset**
3. Set **Name**: `virtual_tryon`
4. Set **Type**: `Unsigned`
5. Copy your **Cloud Name** from Dashboard

### 2.3 Add API Keys to Shopify Theme

1. In **Shopify Admin**, go to **Sales Channels** → **Online Store** → **Themes**
2. Find "Fairy Frills Virtual Try-On" theme
3. Click **Customize** (or **Edit code** for advanced options)
4. In **Theme settings** (bottom left), look for:
   - **Fash AI API Key** → Paste your Fash.AI API key
   - **Cloudinary Cloud Name** → Paste your cloud name (or use existing: `386471482775984`)
   - **Cloudinary Upload Preset** → Paste upload preset (or use existing: `virtual_tryon`)

**Location in Theme Editor**:
```
Theme Settings 
  → API & Services
    → Fash.AI API Key
    → Cloudinary Configuration
      → Cloud Name
      → Upload Preset
```

---

## Step 3: Set Up Products

### 3.1 Add Products to Virtual Try-On Block

1. In **Theme Editor**, find the **"Kids virtual try-on"** block section
2. Scroll to **Product selection** section
3. Click **"Select products"** dropdown
4. Choose the products you want available for try-on
5. Click **Save**

### 3.2 Recommended Product Setup
- Add your best-selling kids items
- Include different sizes (0-3M through 11-12Y)
- Use high-quality product images
- Add accurate product descriptions

---

## Step 4: Create/Access Virtual Try-On Page

### Option A: Automatic (if using existing page)
The theme already includes a virtual try-on template. Just access it:
1. Go to **Online Store** → **Pages**
2. Look for "Virtual Try-On" page
3. If it exists, click to view
4. If not, create a new page with template "virtual-try-on"

### Option B: Create New Virtual Try-On Page
1. Go to **Online Store** → **Pages**
2. Click **Add page**
3. Enter **Title**: "Virtual Try-On" (or similar)
4. In **Template** dropdown, select: **"page.virtual-try-on"**
5. Click **Save**
6. Get the page URL from your store

---

## Step 5: Testing Checklist

### 5.1 Photo Upload Test
- [ ] Navigate to Virtual Try-On page
- [ ] Try **drag & drop** to upload an image
- [ ] Try **browse button** to select file
- [ ] Image preview appears
- [ ] Works on mobile (landscape orientation)

### 5.2 Size Selection Test
- [ ] All 16 sizes are visible (0-3M to 11-12Y)
- [ ] Clicking size highlights it (visual feedback)
- [ ] Can change selection
- [ ] Required before submit (button disabled if no size)

### 5.3 Product Selection Test
- [ ] Product dropdown opens/closes
- [ ] Search filters products correctly
- [ ] Can select multiple products
- [ ] Selected products show as tags
- [ ] Can remove products from tags
- [ ] Required before submit (button disabled if no products)

### 5.4 Try-On Generation Test
**This requires valid Fash.AI API key**
- [ ] Click "Generate Virtual Try-On" button
- [ ] Page shows loading state (optional spinner)
- [ ] After 10-30 seconds, results appear
- [ ] Results show child with selected clothing items
- [ ] Multiple results if multiple products selected

**If try-on fails**:
- Check browser console (F12 → Console tab) for errors
- Verify Fash.AI API key is correct
- Check that image file is valid (good quality, clear face)
- Ensure all selections are made

### 5.5 Cloudinary Archiving Test
- [ ] Results display immediately (non-blocking)
- [ ] Check browser network tab (F12 → Network)
- [ ] Look for upload to `api.cloudinary.com`
- [ ] Should complete in background without blocking UI

### 5.6 Responsive Design Test
- [ ] Mobile (360px width): Single column layout
- [ ] Tablet (768px width): Still single column
- [ ] Desktop (1024px+): Two-column layout
- [ ] All buttons clickable with thumb on mobile
- [ ] Images scale appropriately

---

## Step 6: Integration with Product Pages

The theme also includes virtual try-on blocks on product pages:

1. Go to **Customize theme** → **Product page section**
2. Look for **"Virtual Try-On"** block
3. Enable/customize as needed
4. Products will auto-populate from that product page

---

## Troubleshooting

### Issue: "Fash.AI API key is not configured"
**Solution**:
1. Go to Theme Settings
2. Verify API key is entered correctly
3. Check for extra spaces before/after key
4. Re-save theme settings

### Issue: Upload button does not work
**Solution**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Try different browser
4. Clear browser cache
5. Check that custom element loaded: `<kids-virtual-tryon-...>` in DOM

### Issue: Try-on generation takes too long
**Solution**:
1. This is normal (10-30 seconds)
2. Check Fash.AI API status
3. Try with a clearer image
4. Check internet connection

### Issue: Results don't appear
**Solution**:
1. Check Fash.AI API key validity
2. Check image file (must be image/*)
3. Try with different image
4. Check all selections are made
5. Check console for API error messages

### Issue: Images not uploading to Cloudinary
**Solution**:
1. Results still display (it's background archiving)
2. Check Cloudinary credentials
3. Verify upload preset exists
4. Check Cloudinary account has storage available
5. Errors are logged but don't block user experience

---

## Performance Optimization

### Image Optimization
- Compress images before uploading (< 5MB recommended)
- Use JPEG for photos (faster)
- Optimize product images (< 2MB each)

### API Performance
- Fash.AI processing: 10-30 seconds (normal)
- Cloudinary upload: 2-5 seconds (background)
- Use close enough photos for best results

---

## Security Notes

✅ **Safe**:
- Cloudinary uses unsigned upload (no keys exposed)
- API keys stored in Shopify admin (encrypted)
- FileReader API (user selects files)
- HTTPS enforced

⚠️ **Important**:
- Never share API keys publicly
- Keep Fash.AI key confidential
- Use environment variables if integrating with custom code
- Don't include keys in GitHub commits

---

## Going Live

### Pre-Launch Checklist
- [ ] All API keys configured
- [ ] Products added to selection
- [ ] Tested on desktop browsers (Chrome, Safari, Firefox)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Try-on generation working end-to-end
- [ ] Page is indexed for SEO
- [ ] Analytics tracking enabled (optional)

### Launch Steps
1. Set theme as **Live** in Shopify admin
2. Test live URL from actual domain
3. Share page URL with customers
4. Monitor console for errors
5. Track try-on usage in Shopify analytics

### Post-Launch
- Monitor Fash.AI API usage/costs
- Track try-on conversion rates
- Collect customer feedback
- Optimize product images if needed
- Add to marketing/email campaigns

---

## Support

**Documentation**: See [CLAUDE.md](./CLAUDE.md) for technical details

**API Support**:
- Fash.AI: https://www.fashn.ai/support
- Cloudinary: https://support.cloudinary.com/

**Repository**: https://github.com/Adityatechdome/fairyfrillswithclaude

**Common Issues**: Check "Troubleshooting" section above

---

## Next Steps

1. ✅ Upload theme to Shopify
2. ✅ Configure API keys
3. ✅ Set up products
4. ✅ Run testing checklist
5. ✅ Go live!

Once deployed, share the Virtual Try-On page URL with customers to start testing the functionality.
