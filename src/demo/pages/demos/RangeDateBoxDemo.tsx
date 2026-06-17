import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { RangeDateBox } from '@/components/RangeDateBox';
import { rangeDateBoxMeta } from '@/demo/metadata/rangeDateBoxMeta';

export function RangeDateBoxDemo() {
  return <ComponentPlayground meta={rangeDateBoxMeta} Component={RangeDateBox} />;
}
