import { useMemo, useState } from 'react';
import { DataGrid } from '@/components/DataGrid';
import type { ColumnDef } from '@/components/DataGrid';
import { OptionGroup } from '@/components/OptionGroup';
import { Select } from '@/components/Select';

interface PermissionRow extends Record<string, unknown> {
  id: number;
  name: string;
  module: string;
  assigned: boolean;
}

const MODULES = ['Ventas', 'IT', 'RRHH', 'Finanzas'] as const;

const NAMES = [
  'Ana García',
  'Bruno López',
  'Carla Ruiz',
  'Diego Mora',
  'Elena Paz',
  'Felipe Soto',
];

const permissionRows: PermissionRow[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: NAMES[index % NAMES.length],
  module: MODULES[index % MODULES.length],
  assigned: index % 3 !== 0,
}));

const permissionColumns: ColumnDef<PermissionRow>[] = [
  { key: 'name', header: 'Usuario', sortable: true, minWidth: 160 },
  { key: 'module', header: 'Módulo', sortable: true, minWidth: 120 },
  {
    key: 'assigned',
    header: 'Asignación',
    sortable: true,
    align: 'center',
    minWidth: 120,
    renderCell: (value) => (value ? 'Asignado' : 'No asignado'),
  },
];

const moduleOptions = [
  { value: 'all', label: 'Todos los módulos' },
  ...MODULES.map((module) => ({ value: module, label: module })),
];

const assignmentOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'assigned', label: 'Solo asignados' },
  { value: 'unassigned', label: 'Solo no asignados' },
];

function mergeKeepingHidden(
  previousIds: Array<string | number>,
  visibleRows: PermissionRow[],
  selectedVisible: PermissionRow[],
): Array<string | number> {
  const visibleIdSet = new Set(visibleRows.map((row) => row.id));
  const keptHidden = previousIds.filter((id) => !visibleIdSet.has(Number(id)));
  return [...keptHidden, ...selectedVisible.map((row) => row.id)];
}

/**
 * DataGrid con search + Select de módulo + OptionGroup segmented.
 * El padre filtra `dataSource`; el search interno filtra encima.
 */
export function DataGridToolbarFiltersExample() {
  const [module, setModule] = useState('all');
  const [assignment, setAssignment] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  const dataSource = useMemo(() => {
    return permissionRows.filter((row) => {
      if (module !== 'all' && row.module !== module) return false;
      if (assignment === 'assigned' && !row.assigned) return false;
      if (assignment === 'unassigned' && row.assigned) return false;
      return true;
    });
  }, [module, assignment]);

  return (
    <DataGrid<PermissionRow>
      dataSource={dataSource}
      keyExpr="id"
      columns={permissionColumns}
      selectionMode="multiple"
      selectedRowIds={selectedIds}
      onSelectionChange={(selectedVisible) => {
        setSelectedIds((previous) =>
          mergeKeepingHidden(previous, dataSource, selectedVisible),
        );
      }}
      showSearch
      searchPlaceholder="Buscar usuarios..."
      searchKeys={['name', 'module']}
      paging={{ enabled: true, pageIndex, pageSize }}
      pageSizeOptions={[5, 8, 12]}
      onPageChange={setPageIndex}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPageIndex(0);
      }}
      virtualized={false}
      toolbarRight={
        <>
          <Select
            size="sm"
            width={180}
            value={module}
            options={moduleOptions}
            onChange={(value) => {
              setModule(value);
              setPageIndex(0);
            }}
          />
          <OptionGroup
            size="sm"
            layout="segmented"
            value={assignment}
            options={assignmentOptions}
            onChange={(value) => {
              setAssignment(value);
              setPageIndex(0);
            }}
          />
        </>
      }
    />
  );
}
