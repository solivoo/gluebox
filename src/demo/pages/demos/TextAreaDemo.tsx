import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { TextArea } from '@/components/TextArea';
import { textAreaMeta } from '@/demo/metadata/textAreaMeta';

export function TextAreaDemo() {
  return <ComponentPlayground meta={textAreaMeta} Component={TextArea} />;
}
