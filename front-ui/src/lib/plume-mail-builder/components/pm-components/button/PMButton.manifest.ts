import PMButton, {
  PM_BUTTON_DEFAULT_PROPS,
  PMButtonProps,
} from '@lib/plume-mail-builder/components/pm-components/button/PMButton';
import PMButtonForm from '@lib/plume-mail-builder/components/pm-components/button/PMButton.form';
import { EditableStyle } from '@lib/plume-mail-builder/components/pm-components/button/PMButton.style';
import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { LuRectangleHorizontal } from 'react-icons/lu';

const pmButtonManifest: ComponentManifest<PMButtonProps, EditableStyle, HTMLAnchorElement> = {
  id: 'plm_button',
  type: ComponentType.CONTENT,
  widgetTitle: 'Button',
  widgetIcon: (LuRectangleHorizontal as unknown as ((props: unknown) => JSX.Element)),
  component: PMButton,
  defaultProps: PM_BUTTON_DEFAULT_PROPS,
  editorForm: PMButtonForm,
  // Css importer
  // styleLoader: () => import('./pm-button.module.scss?inline'),
  styleLoader: undefined,
};

export default pmButtonManifest;
