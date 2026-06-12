import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Conecta el Sidebar con React Router.
 * El Sidebar no conoce el router: solo recibe activePath y onNavigate.
 */
export function useSidebarNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  return {
    activePath: pathname,
    onNavigate,
  };
}
