import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { DateBox } from '@/components/DateBox';
import { dateBoxMeta } from '@/demo/metadata/dateBoxMeta';

export function DateBoxDemo() {
  return <ComponentPlayground meta={dateBoxMeta} Component={DateBox} />;
}
