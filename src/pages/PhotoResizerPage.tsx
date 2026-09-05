import { TOOL_BY_PATH } from '../lib/site';
import { ResizePage } from '../components/ResizePage';

const TOOL = TOOL_BY_PATH['/photo-resizer'];

export function PhotoResizerPage() {
  return (
    <ResizePage
      title={TOOL!.title}
      intro={TOOL!.intro}
      path="/photo-resizer"
      defaultUnit="px"
      presetCategory="instagram"
    />
  );
}
