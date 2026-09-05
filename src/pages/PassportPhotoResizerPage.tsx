import { TOOL_BY_PATH } from '../lib/site';
import { ResizePage } from '../components/ResizePage';
import { PASSPORT_PRESETS } from '../lib/passportPresets';

const TOOL = TOOL_BY_PATH['/passport-photo-resizer'];

export function PassportPhotoResizerPage() {
  return (
    <ResizePage
      title={TOOL!.title}
      intro={TOOL!.intro}
      path="/passport-photo-resizer"
      defaultUnit="mm"
      defaultDpi={300}
      defaultFormat="image/jpeg"
      presets={PASSPORT_PRESETS.map((p) => ({ label: `${p.label} — ${p.widthMm}×${p.heightMm}mm`, width: p.widthMm, height: p.heightMm }))}
    />
  );
}
