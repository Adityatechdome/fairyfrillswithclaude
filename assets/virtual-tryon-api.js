class VirtualTryOnAPI {
  constructor(options = {}) {
    this.webhookUrl = options.webhookUrl || 'https://n8n.tdwebsites.in/webhook/shopify-tryon';
    this.timeout = options.timeout || 120000;
    this.cloudinaryCloudName = options.cloudinaryCloudName || '386471482775984';
    this.cloudinaryUploadPreset = options.cloudinaryUploadPreset || 'virtual_tryon';
  }

  async generateVirtualTryOn(payload) {
    try {
      const response = await this.fetchWithTimeout(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Webhook error: ${response.status}`);
      }

      const data = await response.json();
      return this.normalizeResponse(data);
    } catch (error) {
      console.error('Virtual Try-On Webhook Error:', error);
      throw error;
    }
  }

  normalizeResponse(data) {
    // Handle array response: [{ url: "..." }, ...]
    if (Array.isArray(data)) {
      return { images: data.map(item => (typeof item === 'string' ? { url: item } : item)) };
    }
    // Handle { images: [...] }
    if (data.images) {
      return { images: data.images.map(item => (typeof item === 'string' ? { url: item } : item)) };
    }
    // Handle { image: "url" } or { url: "url" }
    const url = data.image || data.url || data.output || data.result;
    if (url) {
      return { images: [{ url }] };
    }
    // Return as-is and let the caller handle empty
    return { images: [] };
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
        throw new Error('Request timed out. Please try again.');
      }
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