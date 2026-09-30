import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { TagBox } from '@/components/TagBox';
import { tagBoxMeta } from '@/demo/metadata/tagBoxMeta';

export function TagBoxDemo() {
  return <ComponentPlayground meta={tagBoxMeta} Component={TagBox} />;
}
