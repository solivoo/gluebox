import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { NumberBox } from '@/components/NumberBox';
import { numberBoxMeta } from '@/demo/metadata/numberBoxMeta';

export function NumberBoxDemo() {
  return <ComponentPlayground meta={numberBoxMeta} Component={NumberBox} />;
}
