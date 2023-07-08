import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

export type ComponentWidget = {
  id: string,
  widgetTitle: string,
  widgetIcon: (props: unknown) => JSX.Element,
  widgetType: ComponentType
};
