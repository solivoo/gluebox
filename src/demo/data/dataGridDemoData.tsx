import type { ColumnDef } from '@/components/DataGrid';

export interface DemoEmployee extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  department: string;
  status: 'Activo' | 'Inactivo';
}

const departments = ['Ventas', 'IT', 'RRHH', 'Finanzas', 'Marketing', 'Operaciones'] as const;
const firstNames = [
  'Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Felipe', 'Gabriela', 'Hugo',
  'Inés', 'Jorge', 'Karina', 'Leo', 'María', 'Nico', 'Olga', 'Pablo',
  'Rosa', 'Sergio', 'Teresa', 'Ulises', 'Valeria', 'Walter', 'Ximena', 'Yago', 'Zoe',
];
const lastNames = [
  'García', 'López', 'Ruiz', 'Mora', 'Paz', 'Soto', 'Núñez', 'Vega',
  'Torres', 'Ramírez', 'Flores', 'Castro', 'Ríos', 'Méndez', 'Silva', 'Ortega',
];

function buildDemoEmployees(count: number): DemoEmployee[] {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const first = firstNames[index % firstNames.length];
    const last = lastNames[(index * 7) % lastNames.length];
    const department = departments[index % departments.length];
    const slug = `${first}.${last}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '.');

    return {
      id,
      name: `${first} ${last}`,
      email: `${slug}${id}@empresa.com`,
      department,
      status: index % 5 === 0 ? 'Inactivo' : 'Activo',
    };
  });
}

/** Dataset grande para demostrar virtualización de filas */
export const demoEmployees = buildDemoEmployees(500);

export const demoEmployeeColumns: ColumnDef<DemoEmployee>[] = [
  { key: 'id', header: 'ID', sortable: true, width: 72, align: 'center' },
  { key: 'name', header: 'Nombre', sortable: true, minWidth: 160 },
  { key: 'email', header: 'Email', sortable: true, minWidth: 200 },
  { key: 'department', header: 'Departamento', sortable: true, minWidth: 140 },
  {
    key: 'status',
    header: 'Estado',
    sortable: true,
    align: 'center',
    minWidth: 110,
    renderCell: (value) => (
      <span
        className={`dg-demo-status dg-demo-status--${String(value).toLowerCase()}`}
      >
        {String(value)}
      </span>
    ),
  },
];
