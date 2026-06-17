import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/demo/layout/AppLayout';
import { MenuPage } from '@/demo/pages/MenuPage';
import { ComponentDocPage } from '@/demo/pages/docs/ComponentDocPage';
import { AppearancePage } from '@/demo/pages/docs/AppearancePage';
import { ButtonDemo } from '@/demo/pages/demos/ButtonDemo';
import { SelectDemo } from '@/demo/pages/demos/SelectDemo';
import { TextBoxDemo } from '@/demo/pages/demos/TextBoxDemo';
import { SidebarDemo } from '@/demo/pages/demos/SidebarDemo';
import { DateBoxDemo } from '@/demo/pages/demos/DateBoxDemo';
import { RangeDateBoxDemo } from '@/demo/pages/demos/RangeDateBoxDemo';
import { OptionGroupDemo } from '@/demo/pages/demos/OptionGroupDemo';
import { CheckButtonDemo } from '@/demo/pages/demos/CheckButtonDemo';
import { defaultRoutePath } from '@/demo/routing/menuRouteRegistry';
import '@/demo/pages/docs/ComponentDocPage.css';
import '@/demo/pages/docs/AppearancePage.css';

function ComponentListPage() {
  return (
    <article style={{ padding: '2rem', maxWidth: '40rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        UI Components
      </h1>
      <p style={{ marginBottom: '1rem', color: 'var(--glb-muted, #64748b)' }}>
        Seleccioná un componente del menú lateral para ver su documentación,
        API reference y demos interactivas.
      </p>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {[
          { name: 'Button', desc: 'Botón multi-variante con carga, temas y estados.', color: '#6366f1' },
          { name: 'Select', desc: 'Select con búsqueda, teclado y label flotante.', color: '#059669' },
          { name: 'TextBox', desc: 'Campo de texto con adornos, clearable y validación.', color: '#0ea5e9' },
          { name: 'Sidebar', desc: 'Navegación jerárquica RBAC/ABAC con colapsado.', color: '#f59e0b' },
          { name: 'DateBox', desc: 'Selector de fecha individual con calendario nativo y temas.', color: '#8b5cf6' },
          { name: 'RangeDateBox', desc: 'Selector de rango de fechas con campos inicio/fin vinculados.', color: '#ec4899' },
          { name: 'OptionGroup', desc: 'Selección exclusiva con layouts vertical, horizontal y segmentado.', color: '#14b8a6' },
          { name: 'CheckButton', desc: 'Botón toggle con semántica de checkbox e ícono de check.', color: '#f97316' },
        ].map((c) => (
          <div
            key={c.name}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--glb-border, #2d3139)',
              background: 'var(--glb-surface, #1a1d27)',
              cursor: 'default',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: c.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 600 }}>{c.name}</span>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem', color: 'var(--glb-muted, #64748b)' }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={defaultRoutePath} replace />} />

          {/* ═══ Listado de componentes ═══ */}
          <Route path="componentes" element={<ComponentListPage />} />

          {/* ═══ Demos (playgrounds exactos) ═══ */}
          <Route path="componentes/button" element={<ButtonDemo />} />
          <Route path="componentes/select" element={<SelectDemo />} />
          <Route path="componentes/textbox" element={<TextBoxDemo />} />
          <Route path="componentes/sidebar" element={<SidebarDemo />} />
          <Route path="componentes/datebox" element={<DateBoxDemo />} />
          <Route path="componentes/rangedatebox" element={<RangeDateBoxDemo />} />
          <Route path="componentes/optiongroup" element={<OptionGroupDemo />} />
          <Route path="componentes/checkbutton" element={<CheckButtonDemo />} />

          {/* ═══ Documentación de componentes ═══ */}
          <Route path="componentes/:component/*" element={<ComponentDocPage />} />

          {/* ═══ Apariencia ═══ */}
          <Route path="apariencia/:section" element={<AppearancePage />} />
          <Route path="apariencia" element={<AppearancePage />} />

          {/* ═══ Fallback ═══ */}
          <Route path="*" element={<MenuPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
