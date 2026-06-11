import {
  ChevronDown,
  Circle,
  HelpCircle,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { IconResolver } from '@/components/Sidebar/type/icon.types';

const registry: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  'shopping-cart': ShoppingCart,
  settings: Settings,
  users: Users,
  'help-circle': HelpCircle,
  'chevron-down': ChevronDown,
  'panel-left-close': PanelLeftClose,
  'panel-left-open': PanelLeftOpen,
};

export const renderMenuIcon: IconResolver = (name, className) => {
  const Icon = registry[name] ?? Circle;
  return <Icon className={className} size={20} aria-hidden />;
};

/** Lista para futuro icon picker en el admin */
export const allowedMenuIcons = Object.keys(registry);
