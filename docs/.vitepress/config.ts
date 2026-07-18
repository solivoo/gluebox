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
      { text: 'DataGrid', link: '/components/datagrid' },
      { text: 'Temas', link: '/guide/themes' },
      { text: 'Formularios', link: '/components/forms' },
      { text: 'Sidebar', link: '/components/sidebar' },
      { text: 'PageActionsMenu', link: '/components/page-actions-menu' },
      { text: 'GitHub', link: 'https://github.com/solivoo/gluebox' },
    ],
    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Introducción', link: '/guide/getting-started' },
          { text: 'Instalación', link: '/guide/installation' },
          { text: 'Temas y apariencia', link: '/guide/themes' },
          { text: 'Tipos de eventos', link: '/guide/event-types' },
          { text: 'Esquema del menú (API)', link: '/guide/menu-api' },
          { text: 'Integración con routing', link: '/guide/routing' },
        ],
      },
      {
        text: 'Componentes',
        items: [
          { text: 'Resumen', link: '/components/' },
          { text: 'DataGrid', link: '/components/datagrid' },
          { text: 'Formularios', link: '/components/forms' },
          { text: 'Botones y selección', link: '/components/buttons' },
          { text: 'Overlays (Popup / Toast)', link: '/components/overlays' },
          { text: 'Sidebar', link: '/components/sidebar' },
          { text: 'PageActionsMenu', link: '/components/page-actions-menu' },
        ],
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
