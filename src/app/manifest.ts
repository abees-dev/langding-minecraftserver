import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AetherMine Prison-RPG Minecraft Server',
    short_name: 'AetherMine',
    description: 'Máy chủ Minecraft Prison RPG Việt Nam hàng đầu (IP: mc.aethermines.com)',
    start_url: '/',
    display: 'standalone',
    background_color: '#070913',
    theme_color: '#00f0ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
