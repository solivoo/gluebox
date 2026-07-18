import { useMemo, useState } from 'react';
import {
  Archive,
  Building2,
  Copy,
  Download,
  FilePlus,
  Pencil,
  Plus,
  RefreshCw,
  Share2,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import {
  PageActionsMenu,
  type PageActionItem,
  type PageActionsMenuProps,
} from '@/components/PageActionsMenu';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import {
  pageActionsMenuMeta,
  type PageActionsMenuPlaygroundDefaults,
} from '@/demo/metadata/pageActionsMenuMeta';

const ICONS: Record<string, LucideIcon> = {
  plus: Plus,
  'refresh-cw': RefreshCw,
  download: Download,
  'building-2': Building2,
  pencil: Pencil,
  'trash-2': Trash2,
  copy: Copy,
  'share-2': Share2,
  archive: Archive,
  'file-plus': FilePlus,
};

function renderIcon(name: string, className: string) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} size={16} aria-hidden />;
}

const SAMPLE_MENUS: Array<{ title: string; items: PageActionItem[] }> = [
  {
    title: 'Empresas',
    items: [
      {
        id: 'emp-create',
        label: 'Crear empresa',
        icon: 'plus',
        route: 'organizacion/empresas/nueva',
      },
      {
        id: 'emp-refresh',
        label: 'Actualizar',
        icon: 'refresh-cw',
        route: null,
      },
      {
        id: 'emp-export',
        label: 'Exportar',
        icon: 'download',
        route: null,
        disabled: true,
        disabledReason: 'Sin permiso de export',
      },
    ],
  },
  {
    title: 'Facturas',
    items: [
      {
        id: 'fac-new',
        label: 'Nueva factura',
        icon: 'file-plus',
        route: 'facturacion/emitir',
      },
      {
        id: 'fac-dup',
        label: 'Duplicar',
        icon: 'copy',
        route: null,
      },
      {
        id: 'fac-share',
        label: 'Compartir',
        icon: 'share-2',
        route: null,
      },
      {
        id: 'fac-archive',
        label: 'Archivar',
        icon: 'archive',
        route: null,
      },
    ],
  },
  {
    title: 'Usuarios',
    items: [
      {
        id: 'usr-edit',
        label: 'Editar perfil',
        icon: 'pencil',
        route: 'usuarios/editar',
      },
      {
        id: 'usr-invite',
        label: 'Invitar',
        icon: 'plus',
        route: 'usuarios/invitar',
      },
      {
        id: 'usr-delete',
        label: 'Eliminar',
        icon: 'trash-2',
        route: null,
        disabled: true,
        disabledReason: 'Requiere rol admin',
      },
    ],
  },
];

export function PageActionsMenuDemo() {
  const [lastAction, setLastAction] = useState<string>('—');
  const [lastRoute, setLastRoute] = useState<string>('—');

  const menus = useMemo(() => SAMPLE_MENUS, []);

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <ComponentPlayground<PageActionsMenuPlaygroundDefaults>
        meta={pageActionsMenuMeta}
        renderPreview={(props) => {
          const theme =
            props.theme && String(props.theme).trim() !== ''
              ? (props.theme as PageActionsMenuProps['theme'])
              : undefined;

          const shared = {
            variant: (props.variant as PageActionsMenuProps['variant']) ?? 'ghost',
            size: (props.size as PageActionsMenuProps['size']) ?? 'md',
            height:
              typeof props.height === 'number' && props.height > 0
                ? props.height
                : undefined,
            align: (props.align as PageActionsMenuProps['align']) ?? 'end',
            disabled: Boolean(props.disabled),
            emptyMessage: String(
              props.emptyMessage ?? 'No hay acciones disponibles',
            ),
            theme,
            renderIcon,
            onActionSelect: (item: PageActionItem) => {
              setLastAction(item.label);
            },
            onNavigate: (route: string) => {
              setLastRoute(route);
            },
          } as const;

          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                width: '100%',
                alignItems: 'stretch',
              }}
            >
              {menus.map((menu) => (
                <div
                  key={menu.title}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flex: '1 1 10rem',
                    minHeight: 48,
                    padding: '0.5rem 0.75rem',
                    borderRadius: 10,
                    background:
                      'linear-gradient(135deg, rgba(148,163,184,0.12), rgba(99,102,241,0.08))',
                  }}
                >
                  <div style={{ fontWeight: 600, minWidth: 0 }}>{menu.title}</div>
                  <PageActionsMenu
                    items={menu.items}
                    triggerLabel={`Acciones de ${menu.title}`}
                    {...shared}
                  />
                </div>
              ))}
            </div>
          );
        }}
      />

      <aside
        style={{
          padding: '0.85rem 1rem',
          borderRadius: 10,
          border: '1px solid rgba(148,163,184,0.35)',
          fontSize: '0.875rem',
        }}
        aria-live="polite"
      >
        <strong>Eventos</strong>
        <p style={{ margin: '0.35rem 0 0' }}>
          onActionSelect: {lastAction}
        </p>
        <p style={{ margin: '0.25rem 0 0' }}>onNavigate: {lastRoute}</p>
      </aside>
    </div>
  );
}
