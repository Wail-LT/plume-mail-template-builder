import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { DndPayload } from '@lib/plume-mail-builder/types/drag-n-drop/DndPayload';
import { useDrag } from 'react-dnd';

function useDraggableWidget(componentId: string, draggableType?: ComponentType) {
  return useDraggableComponent(componentId, draggableType, true);
}

function useDraggableEntry(entryUuid: string, draggableType?: ComponentType) {
  return useDraggableComponent(entryUuid, draggableType, false);
}

function useDraggableComponent(id: string, draggableType?: ComponentType, isWidget?: boolean) {
  const [, dragConnector] = useDrag<DndPayload>(() => ({
    type: draggableType ?? ComponentType.UNKNOWN,
    item: {
      componentId: isWidget ? id : undefined,
      entryUuid: isWidget ? undefined : id,
      isWidget,
    },
  }));

  return dragConnector;
}

export { useDraggableWidget, useDraggableEntry };
