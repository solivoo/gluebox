import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { Select } from '@/components/Select';
import { selectMeta } from '@/demo/metadata/selectMeta';

export function SelectDemo() {
  return <ComponentPlayground meta={selectMeta} Component={Select} />;
}
