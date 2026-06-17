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
  label="Recibir novedades"
  checked={subscribed}
  onChange={setSubscribed}
/>
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

## Temas

```tsx
<Button theme="modern-dark">Acción</Button>
<OptionGroup theme={optionGroupThemes.dark} options={options} />
```

## Siguiente paso

- [Formularios](/components/forms)
- [Sidebar](/components/sidebar)
