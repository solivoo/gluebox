import { describe, expect, it } from 'vitest';
import type { NavigationNode } from '../type/Navigation.types';
import { filterBySurface, filterNodesBySurface } from './filterBySurface';
import { pageActionsFromNode, contentTabsFromNode } from './pageActionsFromNode';
import { findNavigationNodeById } from './findNavigationNode';

const companies: NavigationNode = {
  id: 'sub-companies',
  label: 'Listado de empresas',
  route: 'organizacion/empresas',
  icon: 'building-2',
  surface: 'sidebar',
  kind: 'view',
  disabled: false,
  disabledReason: null,
  placeholder: false,
  children: [
    {
      id: 'sub-companies-historial',
      label: 'Historial',
      route: 'organizacion/empresas/historial',
      icon: null,
      surface: 'content',
      kind: 'view',
      disabled: false,
      disabledReason: null,
      placeholder: false,
      children: [],
    },
    {
      id: 'sub-companies-create',
      label: 'Crear empresa',
      route: 'organizacion/empresas/nueva',
      icon: 'add_business',
      surface: 'actions',
      kind: 'action',
      disabled: false,
      disabledReason: null,
      placeholder: false,
      children: [],
    },
    {
      id: 'sub-companies-refresh',
      label: 'Actualizar',
      route: null,
      icon: 'refresh',
      surface: 'actions',
      kind: 'action',
      disabled: false,
      disabledReason: null,
      placeholder: false,
      children: [],
    },
  ],
};

const navigation: NavigationNode[] = [
  {
    id: 'sub-org',
    label: 'Organización',
    route: null,
    icon: 'building-2',
    surface: 'sidebar',
    kind: 'group',
    disabled: false,
    disabledReason: null,
    placeholder: false,
    children: [companies],
  },
];

describe('navigation helpers', () => {
  it('filterBySurface sidebar conserva group → view sin actions/content', () => {
    const sidebar = filterBySurface(navigation, 'sidebar');
    expect(sidebar).toHaveLength(1);
    expect(sidebar[0].id).toBe('sub-org');
    expect(sidebar[0].children).toHaveLength(1);
    expect(sidebar[0].children[0].id).toBe('sub-companies');
    expect(sidebar[0].children[0].children).toHaveLength(0);
  });

  it('pageActionsFromNode / contentTabsFromNode', () => {
    const node = findNavigationNodeById(navigation, 'sub-companies');
    expect(pageActionsFromNode(node)).toHaveLength(2);
    expect(contentTabsFromNode(node).map((n) => n.id)).toEqual([
      'sub-companies-historial',
    ]);
  });

  it('filterNodesBySurface lista plana', () => {
    expect(filterNodesBySurface(companies.children, 'actions')).toHaveLength(2);
  });
});
