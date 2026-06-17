import { useState } from 'react';
import { Button } from '@/components/Button';
import { Popup } from '@/components/Popup';
import type { PopupFooterAlign, PopupProps } from '@/components/Popup';
import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { popupMeta } from '@/demo/metadata/popupMeta';

const POPUP_ACTIONS = [
  { label: 'Cancelar', variant: 'outline' as const },
  { label: 'Aceptar', variant: 'primary' as const },
];

export function PopupDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPlayground
      meta={popupMeta}
      renderPreview={(props) => {
        const title = String(props.title ?? popupMeta.defaults.title);
        const content = String(props.children ?? popupMeta.defaults.children);
        const width = props.width as PopupProps['width'];
        const height = props.height as PopupProps['height'];
        const footerAlign = (props.footerAlign ?? 'right') as PopupFooterAlign;

        return (
          <>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Abrir Popup
            </Button>
            <Popup
              open={open}
              onClose={() => setOpen(false)}
              title={title}
              width={width}
              height={height}
              draggable={Boolean(props.draggable)}
              showCloseButton={Boolean(props.showCloseButton)}
              footerAlign={footerAlign}
              closeOnOverlayClick={Boolean(props.closeOnOverlayClick)}
              closeOnEscape={Boolean(props.closeOnEscape)}
              theme={props.theme as PopupProps['theme']}
              actions={POPUP_ACTIONS.map((action) => ({
                ...action,
                onClick: () => setOpen(false),
              }))}
            >
              <p style={{ margin: 0, lineHeight: 1.5 }}>{content}</p>
            </Popup>
          </>
        );
      }}
    />
  );
}
