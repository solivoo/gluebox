import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { Switch } from '@/components/Switch';
import { switchMeta } from '@/demo/metadata/switchMeta';

export function SwitchDemo() {
  return <ComponentPlayground meta={switchMeta} Component={Switch} />;
}
