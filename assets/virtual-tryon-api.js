class VirtualTryOnAPI {
  constructor(options = {}) {
    this.apiKey = options.apiKey || this.getApiKeyFromMeta();
    this.apiBaseUrl = options.apiBaseUrl || 'https://n8n.tdwebsites.in/webhook/shopify-tryon';
    this.timeout = options.timeout || 30000;
    this.cloudinaryCloudName = options.cloudinaryCloudName || '386471482775984';
    this.cloudinaryUploadPreset = options.cloudinaryUploadPreset || 'virtual_tryon';
  }

  getApiKeyFromMeta() {
    const metaTag = document.querySelector('meta[name="fash-ai-api-key"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  }

  async generateVirtualTryOn(payload) {
    if (!this.apiKey) {
      throw new Error('Fash.AI API key is not configured');
    }

    try {
      const response = await this.fetchWithTimeout(`${this.apiBaseUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Version': '1.0',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Virtual Try-On API Error:', error);
      throw error;
    }
  }

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  buildPayload(formData) {
    return {
      image: formData.image,
      size: formData.size,
      products: formData.products,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'shopify-theme',
      },
    };
  }

  async uploadImage(base64Image) {
    try {
      const response = await this.fetchWithTimeout(`${this.apiBaseUrl}/images/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`Image upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.imageUrl || data.id;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  async getImageStatus(imageId) {
    try {
      const response = await this.fetchWithTimeout(`${this.apiBaseUrl}/images/${imageId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }

  async getResultImages(requestId) {
    try {
      const response = await this.fetchWithTimeout(`${this.apiBaseUrl}/results/${requestId}/images`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch results failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch results error:', error);
      throw error;
    }
  }

  async uploadToCloudinary(imageData, filename) {
    try {
      const formData = new FormData();
      const blob = await this.dataUrlToBlob(imageData);
      formData.append('file', blob, filename);
      formData.append('upload_preset', this.cloudinaryUploadPreset);
      formData.append('folder', 'virtual-try-on');

      const response = await this.fetchWithTimeout(
        `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url || data.url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  }

  async dataUrlToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  }
}

export default VirtualTryOnAPI;
