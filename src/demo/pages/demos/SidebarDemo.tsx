import { ComponentPlayground } from '@/demo/playground/ComponentPlayground';
import { Sidebar } from '@/components/Sidebar';
import { sidebarMeta } from '@/demo/metadata/sidebarMeta';

export function SidebarDemo() {
  return <ComponentPlayground meta={sidebarMeta} Component={Sidebar} />;
}
