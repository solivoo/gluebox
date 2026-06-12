import {
  BookOpen,
  ChevronDown,
  Circle,
  HelpCircle,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Settings,
  Store,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';
import type { IconResolver } from '@/components/Sidebar/type/icon.types';

const registry: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  receipt: Receipt,
  'book-open': BookOpen,
  warehouse: Warehouse,
  store: Store,
  settings: Settings,
  'help-circle': HelpCircle,
  'chevron-down': ChevronDown,
  'panel-left-close': PanelLeftClose,
  'panel-left-open': PanelLeftOpen,
};

export const renderMenuIcon: IconResolver = (name, className) => {
  const Icon = registry[name] ?? Circle;
  return <Icon className={className} aria-hidden />;
};

/** Lista para futuro icon picker en el admin */
export const allowedMenuIcons = Object.keys(registry);
