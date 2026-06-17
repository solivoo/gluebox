import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { CheckButton } from '@/components/CheckButton';
import { checkButtonMeta } from '@/demo/metadata/checkButtonMeta';

export function CheckButtonDemo() {
  return <ComponentPlayground meta={checkButtonMeta} Component={CheckButton} />;
}
