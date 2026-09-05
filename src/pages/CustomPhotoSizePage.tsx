import { TOOL_BY_PATH } from '../lib/site';
import { ResizePage } from '../components/ResizePage';

const TOOL = TOOL_BY_PATH['/custom-photo-size'];

export function CustomPhotoSizePage() {
  return (
    <ResizePage
      title={TOOL!.title}
      intro={TOOL!.intro}
      path="/custom-photo-size"
      defaultUnit="mm"
      defaultDpi={300}
      defaultFormat="image/jpeg"
    />
  );
}
