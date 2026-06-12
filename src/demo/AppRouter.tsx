import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/demo/layout/AppLayout';
import { MenuPage } from '@/demo/pages/MenuPage';
import { defaultRoutePath } from '@/demo/routing/menuRouteRegistry';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={defaultRoutePath} replace />} />
          <Route path="*" element={<MenuPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
