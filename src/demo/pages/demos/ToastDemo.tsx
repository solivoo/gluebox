import { Button } from '@/components/Button';
import { ToastProvider, useToast } from '@/components/Toast';
import type { ToastPosition, ToastThemeInput, ToastVariant } from '@/components/Toast';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { toastMeta } from '@/demo/metadata/toastMeta';

function ToastPreviewActions({ props }: { props: Record<string, unknown> }) {
  const { show, dismissAll } = useToast();

  const title = String(props.title ?? toastMeta.defaults.title);
  const message = String(props.children ?? toastMeta.defaults.children);
  const variant = (props.variant ?? 'default') as ToastVariant;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Button
        variant="primary"
        onClick={() =>
          show({
            title,
            message,
            variant,
            showCloseButton: Boolean(props.showCloseButton),
            showProgress: Boolean(props.showProgress),
            duration: Number(props.duration ?? 5000),
            theme: props.theme as ToastThemeInput | undefined,
          })
        }
      >
        Mostrar toast
      </Button>
      <Button variant="outline" onClick={() => dismissAll()}>
        Cerrar todos
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ComponentPlayground
      meta={toastMeta}
      wrapper={(children, props) => (
        <ToastProvider
          position={(props.position as ToastPosition) ?? 'top-right'}
          defaultDuration={Number(props.duration ?? 5000)}
          showProgress={Boolean(props.showProgress ?? true)}
          theme={props.theme as ToastThemeInput | undefined}
        >
          {children}
        </ToastProvider>
      )}
      renderPreview={(props) => <ToastPreviewActions props={props} />}
    />
  );
}
