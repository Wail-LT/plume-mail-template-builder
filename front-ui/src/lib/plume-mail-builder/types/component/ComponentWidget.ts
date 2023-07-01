export const DRAGGABLE_WIDGET_TYPE = 'widget';

export type ComponentWidget = {
  id: string,
  widgetTitle: string,
  widgetIcon: () => JSX.Element,
};
