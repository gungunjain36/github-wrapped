import html2canvas from 'html2canvas';

export const exportAsImage = async (element, imageFileName) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
    logging: false,
    useCORS: true,
  });
  
  // For direct download
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement('a');
  link.download = `${imageFileName}.png`;
  link.href = image;
  link.click();
  
  // For sharing
  const blob = await (await fetch(image)).blob();
  return new File([blob], `${imageFileName}.png`, { type: 'image/png' });
};

export const shareCard = async (cardElement, userData) => {
  try {
    const file = await exportAsImage(cardElement, `github-wrapped-${userData.login}`);
    
    if (navigator.share) {
      await navigator.share({
        title: 'My GitHub Wrapped 2024',
        text: `Check out my GitHub Wrapped 2024! 🚀\n\n${userData.name}'s Year in Code`,
        files: [file],
      });
    } else {
      // Fallback to Twitter sharing
      const imageUrl = URL.createObjectURL(file);
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out my GitHub Wrapped 2024! 🚀\n\n${userData.name}'s Year in Code`
      )}&url=${encodeURIComponent(imageUrl)}`, '_blank');
    }
  } catch (error) {
    console.error('Error sharing card:', error);
  }
}; 