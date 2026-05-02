# fairyfrillswithclaude - Shopify Virtual Try-On Theme

This Shopify theme includes an AI-powered virtual try-on solution integrated with Fash.AI and Cloudinary.

## Features
- Virtual try-on for product pages
- Product search with virtual try-on functionality
- Photo upload with drag & drop support
- Size and product selection
- Real-time image generation via Fash.AI API
- Automatic image archiving to Cloudinary
- Download generated try-on images

## Setup
1. Configure Fash.AI API key in block settings
2. Create Cloudinary unsigned upload preset named 'virtual_tryon'
3. Set Cloudinary upload preset in block/section settings

## Files
- assets/virtual-tryon-api.js - API client for Fash.AI and Cloudinary
- blocks/virtual-tryon-with-api.liquid - Product page virtual try-on block
- sections/search-virtual-tryon.liquid - Search page virtual try-on section
- templates/page.virtual-try-on.json - Dedicated virtual try-on page template
- templates/search.json - Updated search page with virtual try-on section

