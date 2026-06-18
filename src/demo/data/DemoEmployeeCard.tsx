import type { DataGridCardRenderContext } from '@/components/DataGrid';
import type { ColumnDef } from '@/components/DataGrid';
import type { DemoEmployee } from './dataGridDemoData';

export function DemoEmployeeCard({
  row,
  selected,
}: Readonly<DataGridCardRenderContext<DemoEmployee>>) {
  const initial = row.name.trim().charAt(0).toUpperCase();
  const statusClass =
    row.status === 'Activo'
      ? 'dg-employee-card__status--active'
      : 'dg-employee-card__status--inactive';

  return (
    <div className="dg-employee-card__body">
      <div className="dg-employee-card__avatar" aria-hidden="true">
        {initial}
      </div>
      <div className="dg-employee-card__info">
        <div className="dg-employee-card__name">{row.name}</div>
        <div className="dg-employee-card__meta">
          <span className="dg-employee-card__department">{row.department}</span>
          <span className={`dg-employee-card__status ${statusClass}`}>{row.status}</span>
        </div>
        <div className="dg-employee-card__email">{row.email}</div>
      </div>
      {selected && <span className="dg-employee-card__selected">Seleccionado</span>}
    </div>
  );
}

/** Alias de función para renderCard */
export function renderDemoEmployeeCard(
  context: DataGridCardRenderContext<DemoEmployee>,
) {
  return <DemoEmployeeCard {...context} />;
}

/** Columnas mínimas para el grid de ejemplo con renderCardComponent */
export const demoEmployeeCardColumns: ColumnDef<DemoEmployee>[] = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'department', header: 'Departamento', sortable: true },
  { key: 'status', header: 'Estado', sortable: true },
];
