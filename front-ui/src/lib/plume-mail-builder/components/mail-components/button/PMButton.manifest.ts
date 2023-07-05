import PMButton, { PM_BUTTON_DEFAULT_PROPS } from '@lib/plume-mail-builder/components/mail-components/button/PMButton';
import PMButtonForm from '@lib/plume-mail-builder/components/mail-components/button/PMButton.form';
import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { LuRectangleHorizontal } from 'react-icons/lu';

export default {
  id: 'plm_button',
  type: 'content',
  widgetTitle: 'Button',
  widgetIcon: LuRectangleHorizontal,
  component: PMButton,
  defaultProps: PM_BUTTON_DEFAULT_PROPS,
  editorForm: PMButtonForm,
  // Css importer
  // styleLoader: () => import('./pm-button.module.scss?inline'),
  styleLoader: undefined,
} as ComponentManifest;
