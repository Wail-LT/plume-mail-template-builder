import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { LuRectangleHorizontal } from 'react-icons/lu';
import ButtonComponent from './Button.component';
import ButtonFrom from './Button.form';

export default {
  id: 'plm_button',
  type: 'content',
  widgetTitle: 'Button',
  widgetIcon: LuRectangleHorizontal,
  editorForm: ButtonFrom,
  component: ButtonComponent,
} as ComponentManifest;
