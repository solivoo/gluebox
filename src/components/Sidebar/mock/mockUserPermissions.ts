import type { Permission } from "../type/menu.types";

export const mockUserPermissions: Permission[] = [
    "dashboard:read",
    "ventas:read",
    "ventas:pedidos:read",
    "ventas:facturas:read",
    "admin:read",
    "admin:usuarios:read",
    "admin:roles:read",
    "ajustes:read",
    "ayuda:read",
];
