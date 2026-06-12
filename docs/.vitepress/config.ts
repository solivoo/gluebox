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
      { text: 'GitHub', link: 'https://github.com/solivoo/gluebox' },
    ],
    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Introducción', link: '/guide/getting-started' },
          { text: 'Instalación', link: '/guide/installation' },
          { text: 'Esquema del menú (API)', link: '/guide/menu-api' },
          { text: 'Integración con routing', link: '/guide/routing' },
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
