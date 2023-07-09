import PMDragNDropService from '@lib/plume-mail-builder/services/drag-n-drop/DragNDropService';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { DndCollectedProps, DndPayload } from '@lib/plume-mail-builder/types/drag-n-drop/DndPayload';
import { getGlobalInstance } from 'plume-ts-di';
import { ConnectDropTarget, useDrop } from 'react-dnd';

export default function useDroppableContainer(
  entryUuid: string,
  componentType?: ComponentType,
): [ConnectDropTarget, DndCollectedProps] {
  const pmBuilderService = getGlobalInstance(PMBuilderService);
  const accept: ComponentType[] = componentType
    ? PMDragNDropService.getDroppableComponentAcceptTypes(componentType)
    : [];

  const [{ isOver }, dropConnector] = useDrop<DndPayload, unknown, DndCollectedProps>(() => ({
    accept,
    drop: (item: DndPayload, monitor) => {
      if (monitor.didDrop()) {
        // Component was dropped on a nested droppable component
        return;
      }

      if (item.isWidget) {
        pmBuilderService.addEntry(item.componentId!, entryUuid);
      } else {
        // pmBuilderService.moveComponent(item.id, componentId);
      }
      // TODO HANDLE MOVING COMPONENT
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  return [dropConnector, { isOver }];
}
