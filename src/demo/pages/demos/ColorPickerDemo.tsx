import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { ColorPicker } from '@/components/ColorPicker';
import { colorPickerMeta } from '@/demo/metadata/colorPickerMeta';

export function ColorPickerDemo() {
  return <ComponentPlayground meta={colorPickerMeta} Component={ColorPicker} />;
}
