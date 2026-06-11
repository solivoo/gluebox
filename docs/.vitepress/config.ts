import { defineConfig } from 'vitepress';

const repoBase = '/gluebox/';

export default defineConfig({
  title: 'gluBox',
  description: 'Librería de componentes React para aplicaciones empresariales',
  base: repoBase,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/getting-started' },
      { text: 'Sidebar', link: '/components/sidebar' },
      { text: 'Storybook', link: '/storybook/' },
    ],
    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Introducción', link: '/guide/getting-started' },
          { text: 'Instalación', link: '/guide/installation' },
          { text: 'Publicación npm', link: '/guide/publishing' },
        ],
      },
      {
        text: 'Componentes',
        items: [{ text: 'Sidebar', link: '/components/sidebar' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/solivoo/gluebox' },
    ],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2026 gluBox',
    },
  },
});
