import type { ReactNode } from 'react';
import type { Permission } from '@/components/Sidebar/type/menu.types';
import { hasPermission } from '@/components/Sidebar/type/hasPermission';
import { ForbiddenPage } from '@/demo/pages/ForbiddenPage';

interface RequirePermissionProps {
  userPermissions: Permission[];
  requiredPermissions?: Permission[];
  children: ReactNode;
}

export function RequirePermission({
  userPermissions,
  requiredPermissions,
  children,
}: RequirePermissionProps) {
  if (!hasPermission(userPermissions, requiredPermissions)) {
    return <ForbiddenPage />;
  }

  return children;
}
