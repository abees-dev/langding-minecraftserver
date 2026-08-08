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
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
