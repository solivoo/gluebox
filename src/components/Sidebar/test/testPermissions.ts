import { filterVisibleMenu } from '../type/filterVisibleMenu';
import { mockMenu } from '../data/mockMenu';
import { mockUserPermissions } from '../mock/mockUserPermissions';

const filtered = filterVisibleMenu(mockMenu, mockUserPermissions);

console.log('Menú filtrado:', JSON.stringify(filtered, null, 2));
