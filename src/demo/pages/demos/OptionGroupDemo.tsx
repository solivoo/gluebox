import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { OptionGroup } from '@/components/OptionGroup';
import { optionGroupMeta } from '@/demo/metadata/optionGroupMeta';

export function OptionGroupDemo() {
  return <ComponentPlayground meta={optionGroupMeta} Component={OptionGroup} />;
}
