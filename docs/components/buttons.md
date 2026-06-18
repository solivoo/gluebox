# Botones y selección

Componentes de acción y selección mutuamente excluyente.

## Importación

```tsx
import {
  Button,
  CheckButton,
  OptionGroup,
  buttonThemes,
  checkButtonThemes,
  optionGroupThemes,
} from 'glubox';

import type {
  ButtonProps,
  CheckButtonProps,
  OptionGroupProps,
} from 'glubox';

import 'glubox/style.css';
```

## Button

```tsx
<Button variant="primary" size="md" onClick={() => {}}>
  Guardar
</Button>
```

| Prop | Valores |
|------|---------|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `danger` |
| `size` | `sm`, `md`, `lg` |
| `theme` | Preset o tokens custom |
| `disabled`, `fullWidth`, `iconLeft`, `iconRight` | — |

## CheckButton

Toggle con semántica de checkbox (estado checked / unchecked):

```tsx
<CheckButton
  checked={subscribed}
  onChange={setSubscribed}
>
  Recibir novedades
</CheckButton>
```

## OptionGroup

Selección exclusiva entre opciones:

```tsx
<OptionGroup
  label="Plan"
  layout="segmented"
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ]}
/>
```

| `layout` | Descripción |
|----------|-------------|
| `vertical` | Lista apilada |
| `horizontal` | Fila de opciones |
| `segmented` | Control tipo segmented control |

Props: `variant`, `size`, `labelPosition`, `disabled`, `error`, `fullWidth`, `theme`.

## Tipos de eventos

| Componente | Tipos exportados |
|------------|------------------|
| `Button` | `ButtonOnClickHandler` |
| `CheckButton` | `CheckButtonOnChangeHandler`, `CheckButtonChangeValue` |
| `OptionGroup` | `OptionGroupOnChangeHandler`, `OptionGroupChangeValue` |

```tsx
import type { CheckButtonOnChangeHandler } from 'glubox';

const handleToggle: CheckButtonOnChangeHandler = (checked) => {
  setSubscribed(checked);
};
```

Referencia completa: [Tipos de eventos](/guide/event-types).

## Temas

Cada componente acepta `theme` con los 6 presets (`light`, `dark`, `modern-light`, `modern-dark`, `enterprise-light`, `enterprise-dark`) u objeto custom:

```tsx
<Button theme="modern-dark">Acción</Button>
<OptionGroup theme={optionGroupThemes.dark} options={options} />
```

Temas globales de la app (`data-theme` / `data-mode`) y prioridad con la prop `theme`: [Guía de temas](/guide/themes).

## Siguiente paso

- [Formularios](/components/forms)
- [Sidebar](/components/sidebar)
