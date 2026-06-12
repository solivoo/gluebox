import { useLocation } from 'react-router-dom';
import { mockUserPermissions } from '@/components/Sidebar/mock/mockUserPermissions';
import { menuRouteRegistry } from '@/demo/routing/menuRouteRegistry';
import { RequirePermission } from '@/demo/routing/RequirePermission';
import { NotFoundPage } from '@/demo/pages/NotFoundPage';
import { PageView } from '@/demo/pages/PageView';

export function MenuPage() {
  const { pathname } = useLocation();
  const route = menuRouteRegistry.get(pathname);

  if (!route) {
    return <NotFoundPage />;
  }

  return (
    <RequirePermission
      userPermissions={mockUserPermissions}
      requiredPermissions={route.permissions}
    >
      <PageView route={route} />
    </RequirePermission>
  );
}
