import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

export type ComponentWidget = {
  id: string,
  type: ComponentType,
  widgetTitle: string,
  widgetIcon: () => JSX.Element,
};
