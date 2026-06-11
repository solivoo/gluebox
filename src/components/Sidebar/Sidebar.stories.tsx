import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar, type SidebarProps } from '@/components/Sidebar';
import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { renderMenuIcon } from '@/icons/menuIconRegistry';
import { GluBoxBrand } from '@/components/brand/GluBoxBrand';

type StoryArgs = Omit<
  SidebarProps,
  'onNavigate' | 'onCollapsedChange' | 'collapsed' | 'activePath'
> & {
  collapsed?: boolean;
  activePath?: string;
};

function SidebarPlayground({
  collapsed: initialCollapsed = false,
  activePath: initialActivePath = '/dashboard',
  ...props
}: StoryArgs) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [activePath, setActivePath] = useState(initialActivePath);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        {...props}
        collapsed={collapsed}
        activePath={activePath}
        onCollapsedChange={setCollapsed}
        onNavigate={setActivePath}
      />
      <main style={{ flex: 1, padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
        <p>
          <strong>Ruta activa:</strong> {activePath}
        </p>
        <p>
          <strong>Estado:</strong> {collapsed ? 'Contraído' : 'Expandido'}
        </p>
      </main>
    </div>
  );
}

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    menu: mockMenu,
    userPermissions: mockUserPermissions,
    brand: GluBoxBrand,
    renderIcon: renderMenuIcon,
    theme: 'dark',
    collapseOthersOnSelect: true,
    collapsed: false,
    activePath: '/dashboard',
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SidebarPlayground {...args} />,
};

export const Collapsed: Story = {
  render: (args) => <SidebarPlayground {...args} collapsed />,
  args: { collapsed: true, width: 64 },
};

export const LightTheme: Story = {
  render: (args) => <SidebarPlayground {...args} />,
  args: { theme: 'light' },
};

export const AccordionOff: Story = {
  render: (args) => <SidebarPlayground {...args} />,
  args: { collapseOthersOnSelect: false },
};

export const LimitedPermissions: Story = {
  render: (args) => <SidebarPlayground {...args} activePath="/ventas/pedidos" />,
  args: {
    userPermissions: ['dashboard:read', 'ventas:read', 'ventas:pedidos:read'],
    activePath: '/ventas/pedidos',
  },
};
