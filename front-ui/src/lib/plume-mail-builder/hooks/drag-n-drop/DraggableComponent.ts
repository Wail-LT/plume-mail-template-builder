import PMDragNDropService from '@lib/plume-mail-builder/services/drag-n-drop/DragNDropService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { DndPayload, DraggableCollectedProps } from '@lib/plume-mail-builder/types/drag-n-drop/DndPayload';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';
import { useDrag } from 'react-dnd';

function useDraggableWidget(componentId: string, draggableType: ComponentType) {
  return useDraggableComponent(componentId, draggableType, true);
}

function useDraggableEntry(
  entryUuid: string,
  draggableType: ComponentType,
  entryIndex: React.MutableRefObject<number | undefined>,
) {
  return useDraggableComponent(entryUuid, draggableType, false, entryIndex);
}

function useDraggableComponent(
  id: string,
  draggableType: ComponentType,
  isWidget?: boolean,
  entryIndex?: React.MutableRefObject<number | undefined>,
) {
  const [{ isDragging }, dragConnector] = useDrag<DndPayload, unknown, DraggableCollectedProps>(() => ({
    type: draggableType,
    item: isWidget ? { componentId: id } : { entryUuid: id, index: entryIndex! },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      PMDragNDropService.stopDragging(id);
    },
  }));

  useOnDependenciesChange(() => {
    if (isDragging) {
      PMDragNDropService.startDragging(id);
    }
  }, [isDragging]);

  return dragConnector;
}

export { useDraggableWidget, useDraggableEntry };
