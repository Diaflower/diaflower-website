// utils/shareUtils.ts

export const generateShareUrl = (platform: string, productSlug: string, productName: string, lang: string) => {
    const isClient = typeof window !== 'undefined';
    const baseUrl = isClient 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const url = `${baseUrl}/${lang}/product/${productSlug}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(productName);
  
    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      case 'instagram':
        // Instagram doesn't have a direct share URL, but we can open the app
        return `https://www.instagram.com/`;
      case 'email':
        return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
      default:
        return '';
    }
  };