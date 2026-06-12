import { mockMenu } from '@/components/Sidebar/data/mockMenu';
import { collectMenuRoutes } from './collectMenuRoutes';

export const menuRouteRegistry = collectMenuRoutes(mockMenu);

export const defaultRoutePath = '/facturacion/facturas/emitir';
