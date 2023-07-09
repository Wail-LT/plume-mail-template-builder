import PMSection, {
  PM_SECTION_DEFAULT_PROPS,
  PMSectionProps,
} from '@lib/plume-mail-builder/components/pm-components/section/PMSection';
import PMSectionForm from '@lib/plume-mail-builder/components/pm-components/section/PMSection.form';
import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { LuRows } from 'react-icons/lu';

const PMSectionManifest: ComponentManifest<PMSectionProps, {}, HTMLTableElement> = {
  id: 'plm_section',
  type: ComponentType.SECTION,
  widgetTitle: 'Section',
  widgetIcon: (LuRows as unknown as ((props: unknown) => JSX.Element)),
  component: PMSection,
  defaultProps: PM_SECTION_DEFAULT_PROPS,
  editorForm: PMSectionForm,
  // Css importer
  // styleLoader: () => import('./pm-button.module.scss?inline'),
  styleLoader: undefined,
};

export default PMSectionManifest;
