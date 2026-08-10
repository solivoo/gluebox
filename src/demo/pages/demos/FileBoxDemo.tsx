import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { FileBox } from '@/components/FileBox';
import { fileBoxMeta } from '@/demo/metadata/fileBoxMeta';

export function FileBoxDemo() {
  return <ComponentPlayground meta={fileBoxMeta} Component={FileBox} />;
}
