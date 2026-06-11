import type { Permission } from "./menu.types";

/**
 * ¿El usuario puede ver un ítem según sus permisos?
 *
 * - Sin permisos requeridos → visible
 * - Con permisos requeridos → visible si tiene al menos uno (OR)
 */

export const hasPermission = (
    permissions: Permission[], 
    requiredPermissions?: Permission[]
): boolean => {

    // Sin permisos requeridos → visible
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    // OR: basta con coincidur uno
    return requiredPermissions.some(permission => permissions.includes(permission));
}