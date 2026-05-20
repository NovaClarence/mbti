import { toPng, toBlob } from 'html-to-image';

export async function downloadCardAsImage(elementId: string, filename: string): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Card element not found');

  const dataUrl = await toPng(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#1a1a2e',
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyCardAsImage(elementId: string): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Card element not found');

  const blob = await toBlob(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#1a1a2e',
  });

  if (!blob) throw new Error('Failed to generate image blob');

  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}
