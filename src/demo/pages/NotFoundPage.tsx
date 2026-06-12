import { Link } from 'react-router-dom';
import { defaultRoutePath } from '@/demo/routing/menuRouteRegistry';

export function NotFoundPage() {
  return (
    <article className="page-view page-view--status">
      <h1 className="page-view__title">404 — Ruta no encontrada</h1>
      <p className="page-view__path">
        La URL no coincide con ningún ítem del menú configurado.
      </p>
      <Link className="page-view__link" to={defaultRoutePath}>
        Ir al inicio
      </Link>
    </article>
  );
}
