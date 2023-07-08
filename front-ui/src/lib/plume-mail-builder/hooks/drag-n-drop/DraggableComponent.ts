import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { useDrag } from 'react-dnd';

function useDraggableWidget(componentId: string, draggableType?: ComponentType) {
  return useDraggableComponent(componentId, draggableType, true);
}

function useDraggableComponent(componentId: string, draggableType?: ComponentType, isWidget?: boolean) {
  const [, dragRef] = useDrag(() => ({
    type: draggableType ?? ComponentType.UNKNOWN,
    item: { id: componentId, isWidget },
  }));

  return dragRef;
}

export { useDraggableWidget, useDraggableComponent };
