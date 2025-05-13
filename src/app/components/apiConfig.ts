// src/utils/apiConfig.ts
export const getApiUrl = (path: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_HTTP_URL || 'http://localhost:8080';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    return `${cleanBaseUrl}/${cleanPath}`;
  };
  
  export const getWsUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || 'ws://localhost:8080';
  };
  
  export const getImageProxyUrl = (imageUrl: string): string => {
    return `${getApiUrl('api/image')}?url=${encodeURIComponent(imageUrl)}`;
  };