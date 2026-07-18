/**
 * Documentación de tipos de eventos exportados por componente.
 * Claves alineadas con `componentDocEntries` en docRegistry.ts.
 */

export interface EventHandlerDoc {
  handlerType: string;
  signature: string;
  description: string;
  payloadType?: string;
}

export interface ComponentEventTypesDoc {
  /** Línea de importación recomendada */
  importTypes: string;
  /** Handlers exportados */
  handlers: EventHandlerDoc[];
  /** Ejemplo de uso tipado */
  usageExample: string;
}

export const SHARED_EVENT_UTILITIES = `// Utilidades genéricas exportadas desde glubox
import type {
  RequiredEventHandler,
  OptionalEventHandler,
  EventHandlerPayload,
} from 'glubox';

// Handler requerido (ej. Popup onClose)
type Close = RequiredEventHandler<PopupProps, 'onClose'>;

// Handler opcional (ej. Select onChange)
type OnChange = OptionalEventHandler<SelectProps, 'onChange'>;

// Payload del primer argumento
type Value = EventHandlerPayload<SelectProps, 'onChange'>; // string`;

export const componentEventTypesDocs: Record<string, ComponentEventTypesDoc> = {
  button: {
    importTypes: `import type { ButtonOnClickHandler } from 'glubox';`,
    handlers: [
      {
        handlerType: 'ButtonOnClickHandler',
        signature: '(event: MouseEvent<HTMLButtonElement>) => void',
        description: 'Handler tipado para onClick. Hereda de ButtonHTMLAttributes.',
      },
    ],
    usageExample: `const handleClick: ButtonOnClickHandler = (event) => {
  event.preventDefault();
};`,
  },
  select: {
    importTypes: `import type {
  SelectOnChangeHandler,
  SelectChangeValue,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'SelectOnChangeHandler',
        payloadType: 'SelectChangeValue',
        signature: '(value: string) => void',
        description: 'Handler de onChange. El valor es el value de la opción seleccionada.',
      },
      {
        handlerType: 'SelectChangeValue',
        signature: 'string',
        description: 'Alias del valor emitido por onChange.',
      },
    ],
    usageExample: `const handleChange: SelectOnChangeHandler = (value) => {
  const next: SelectChangeValue = value;
  setFramework(next);
};`,
  },
  textbox: {
    importTypes: `import type {
  TextBoxOnChangeHandler,
  TextBoxOnFocusHandler,
  TextBoxOnBlurHandler,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'TextBoxOnChangeHandler',
        signature: '(event: ChangeEvent<HTMLInputElement>) => void',
        description: 'Handler de onChange. Heredado de InputHTMLAttributes.',
      },
      {
        handlerType: 'TextBoxOnFocusHandler',
        signature: '(event: FocusEvent<HTMLInputElement>) => void',
        description: 'Handler de onFocus.',
      },
      {
        handlerType: 'TextBoxOnBlurHandler',
        signature: '(event: FocusEvent<HTMLInputElement>) => void',
        description: 'Handler de onBlur.',
      },
    ],
    usageExample: `const handleChange: TextBoxOnChangeHandler = (event) => {
  setEmail(event.target.value);
};`,
  },
  textarea: {
    importTypes: `import type {
  TextAreaOnChangeHandler,
  TextAreaOnFocusHandler,
  TextAreaOnBlurHandler,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'TextAreaOnChangeHandler',
        signature: '(event: ChangeEvent<HTMLTextAreaElement>) => void',
        description: 'Handler de onChange. Heredado de TextareaHTMLAttributes.',
      },
      {
        handlerType: 'TextAreaOnFocusHandler',
        signature: '(event: FocusEvent<HTMLTextAreaElement>) => void',
        description: 'Handler de onFocus.',
      },
      {
        handlerType: 'TextAreaOnBlurHandler',
        signature: '(event: FocusEvent<HTMLTextAreaElement>) => void',
        description: 'Handler de onBlur.',
      },
    ],
    usageExample: `const handleChange: TextAreaOnChangeHandler = (event) => {
  setNotes(event.target.value);
};`,
  },
  sidebar: {
    importTypes: `import type {
  SidebarOnCollapsedChangeHandler,
  SidebarOnNavigateHandler,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'SidebarOnCollapsedChangeHandler',
        signature: '(collapsed: boolean) => void',
        description: 'Handler de onCollapsedChange al colapsar/expandir.',
      },
      {
        handlerType: 'SidebarOnNavigateHandler',
        signature: '(path: string) => void',
        description: 'Handler de onNavigate al elegir un ítem con path.',
      },
    ],
    usageExample: `const handleNavigate: SidebarOnNavigateHandler = (path) => {
  navigate(path);
};`,
  },
  datebox: {
    importTypes: `import type { DateBoxOnChangeHandler } from 'glubox';`,
    handlers: [
      {
        handlerType: 'DateBoxOnChangeHandler',
        signature: '(event: ChangeEvent<HTMLInputElement>) => void',
        description: 'Handler de onChange del input date nativo.',
      },
    ],
    usageExample: `const handleDateChange: DateBoxOnChangeHandler = (event) => {
  setDate(event.target.value);
};`,
  },
  rangedatebox: {
    importTypes: `import type {
  RangeDateBoxOnChangeHandler,
  RangeDateBoxChangeEvent,
  DateRange,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'RangeDateBoxOnChangeHandler',
        payloadType: 'RangeDateBoxChangeEvent',
        signature: '(range: DateRange) => void',
        description: 'Handler de onChange cuando cambia inicio o fin.',
      },
      {
        handlerType: 'RangeDateBoxChangeEvent',
        signature: '{ start: string; end: string }',
        description: 'Alias del payload de onChange (mismo shape que DateRange).',
      },
    ],
    usageExample: `const handleRange: RangeDateBoxOnChangeHandler = (range) => {
  setPeriod(range);
};`,
  },
  optiongroup: {
    importTypes: `import type {
  OptionGroupOnChangeHandler,
  OptionGroupChangeValue,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'OptionGroupOnChangeHandler',
        payloadType: 'OptionGroupChangeValue',
        signature: '(value: string) => void',
        description: 'Handler de onChange al seleccionar una opción.',
      },
      {
        handlerType: 'OptionGroupChangeValue',
        signature: 'string',
        description: 'Valor emitido por onChange.',
      },
    ],
    usageExample: `const handlePlan: OptionGroupOnChangeHandler = (value) => {
  setPlan(value);
};`,
  },
  checkbutton: {
    importTypes: `import type {
  CheckButtonOnChangeHandler,
  CheckButtonChangeValue,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'CheckButtonOnChangeHandler',
        payloadType: 'CheckButtonChangeValue',
        signature: '(checked: boolean) => void',
        description: 'Handler de onChange al alternar marcado/desmarcado.',
      },
      {
        handlerType: 'CheckButtonChangeValue',
        signature: 'boolean',
        description: 'Estado checked emitido por onChange.',
      },
    ],
    usageExample: `const handleToggle: CheckButtonOnChangeHandler = (checked) => {
  setSubscribed(checked);
};`,
  },
  popup: {
    importTypes: `import type {
  PopupOnCloseHandler,
  PopupActionOnClickHandler,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'PopupOnCloseHandler',
        signature: '() => void',
        description: 'Handler requerido de onClose (overlay, Escape, botón ×).',
      },
      {
        handlerType: 'PopupActionOnClickHandler',
        signature: '() => void',
        description: 'Handler de PopupAction.onClick en botones del pie.',
      },
    ],
    usageExample: `const handleClose: PopupOnCloseHandler = () => {
  setOpen(false);
};

const handleAccept: PopupActionOnClickHandler = () => {
  save();
  setOpen(false);
};`,
  },
  toast: {
    importTypes: `import type {
  ToastShowHandler,
  ToastDismissHandler,
  ToastDismissAllHandler,
  ToastOnCloseHandler,
  ShowToastOptions,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'ToastShowHandler',
        signature: '(options: ShowToastOptions) => string',
        description: 'Tipo de useToast().show. Devuelve el id del toast.',
      },
      {
        handlerType: 'ToastDismissHandler',
        signature: '(id: string) => void',
        description: 'Tipo de useToast().dismiss.',
      },
      {
        handlerType: 'ToastDismissAllHandler',
        signature: '() => void',
        description: 'Tipo de useToast().dismissAll.',
      },
      {
        handlerType: 'ToastOnCloseHandler',
        signature: '() => void',
        description: 'Callback onClose de un toast individual.',
      },
    ],
    usageExample: `const { show, dismiss } = useToast();

const notify: ToastShowHandler = (options) => show(options);

const closeOne: ToastDismissHandler = (id) => dismiss(id);`,
  },
  datagrid: {
    importTypes: `import type {
  DataGridOnRowSelectHandler,
  DataGridOnSelectionChangeHandler,
  DataGridOnCardSelectHandler,
  DataGridOnPageChangeHandler,
  DataGridOnPageSizeChangeHandler,
} from 'glubox';`,
    handlers: [
      {
        handlerType: 'DataGridOnRowSelectHandler',
        signature: '(row: T) => void',
        description: 'Handler de onRowSelect en modo single. T es el tipo de fila.',
      },
      {
        handlerType: 'DataGridOnSelectionChangeHandler',
        signature: '(selectedRows: T[]) => void',
        description: 'Handler de onSelectionChange con filas completas seleccionadas.',
      },
      {
        handlerType: 'DataGridOnCardSelectHandler',
        signature: '(row: T) => void',
        description: 'Handler de onCardSelect en layout card. Recibe la fila activada.',
      },
      {
        handlerType: 'DataGridOnPageChangeHandler',
        signature: '(pageIndex: number) => void',
        description: 'Handler de onPageChange (pageIndex 0-based).',
      },
      {
        handlerType: 'DataGridOnPageSizeChangeHandler',
        signature: '(pageSize: number) => void',
        description: 'Handler de onPageSizeChange.',
      },
    ],
    usageExample: `const handlePage: DataGridOnPageChangeHandler = (pageIndex) => {
  setPageIndex(pageIndex);
  fetchRows(pageIndex, pageSize);
};`,
  },
};

export function getEventTypesDoc(componentId: string): ComponentEventTypesDoc | undefined {
  return componentEventTypesDocs[componentId];
}
