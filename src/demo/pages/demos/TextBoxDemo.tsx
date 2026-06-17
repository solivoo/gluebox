import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { TextBox } from '@/components/TextBox';
import { textBoxMeta } from '@/demo/metadata/textBoxMeta';

export function TextBoxDemo() {
  return <ComponentPlayground meta={textBoxMeta} Component={TextBox} />;
}
