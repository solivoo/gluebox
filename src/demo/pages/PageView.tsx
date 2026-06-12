import type { MenuRoute } from '@/demo/routing/collectMenuRoutes';

interface PageViewProps {
  route: MenuRoute;
}

export function PageView({ route }: PageViewProps) {
  return (
    <article className="page-view">
      <nav className="page-view__breadcrumbs" aria-label="Ruta">
        {route.breadcrumbs.map((crumb, index) => {
          const isLast = index === route.breadcrumbs.length - 1;
          return (
            <span key={`${crumb.label}-${index}`} className="page-view__crumb">
              {index > 0 && <span className="page-view__separator">/</span>}
              {crumb.path && !isLast ? (
                <span className="page-view__crumb-link">{crumb.label}</span>
              ) : (
                <span
                  className={
                    isLast ? 'page-view__crumb-current' : 'page-view__crumb-text'
                  }
                >
                  {crumb.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>

      <header className="page-view__header">
        <h1 className="page-view__title">{route.label}</h1>
        <p className="page-view__path">{route.path}</p>
      </header>

      <section className="page-view__body">
        <p>
          Vista de ejemplo para <strong>{route.label}</strong>. En tu app real
          aquí montarías el componente de página correspondiente a esta ruta.
        </p>
      </section>
    </article>
  );
}
