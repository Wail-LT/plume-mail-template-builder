import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

export type ComponentManifest = {
  id: string,
  type: ComponentType,
  widgetTitle: string,
  widgetIcon: ()=>JSX.Element,
  editorForm: ()=>JSX.Element,
  component: ()=>JSX.Element,
};
