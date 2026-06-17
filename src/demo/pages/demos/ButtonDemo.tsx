import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { Button } from '@/components/Button';
import { buttonMeta } from '@/demo/metadata/buttonMeta';

export function ButtonDemo() {
  return <ComponentPlayground meta={buttonMeta} Component={Button} />;
}
