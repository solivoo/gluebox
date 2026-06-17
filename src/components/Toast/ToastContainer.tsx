import { createPortal } from 'react-dom';
import type { ToastItem, ToastPosition } from './type/Toast.types';
import { ToastItemView } from './Toast';

export interface ToastContainerProps {
  items: ToastItem[];
  position: ToastPosition;
  onRequestExit: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ToastContainer(props: Readonly<ToastContainerProps>) {
  const { items, position, onRequestExit, onRemove } = props;

  if (items.length === 0) return null;

  return createPortal(
    <div
      className={`glb-toast-viewport glb-toast-viewport--${position}`}
      aria-label="Notificaciones"
    >
      {items.map((item) => (
        <ToastItemView
          key={item.id}
          id={item.id}
          title={item.title}
          message={item.message}
          variant={item.variant}
          showCloseButton={item.showCloseButton}
          showProgress={item.showProgress}
          theme={item.theme}
          duration={item.duration}
          exiting={Boolean(item.exiting)}
          position={position}
          onRequestExit={() => onRequestExit(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </div>,
    document.body,
  );
}
