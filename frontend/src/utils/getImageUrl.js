export const getImageUrl = (imageSource) => {
  if (!imageSource) return 'https://via.placeholder.com/400';
  
  let url = '';
  if (Array.isArray(imageSource)) {
    if (imageSource.length === 0) return 'https://via.placeholder.com/400';
    url = imageSource[0];
  } else {
    url = imageSource;
  }
  
  if (!url) return 'https://via.placeholder.com/400';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
};
