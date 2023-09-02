import PMDragNDropService from '@lib/plume-mail-builder/services/drag-n-drop/DragNDropService';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { DroppableCollectedProps, DndPayload } from '@lib/plume-mail-builder/types/drag-n-drop/DndPayload';
import { getGlobalInstance } from 'plume-ts-di';
import { ConnectDropTarget, useDrop } from 'react-dnd';

export default function useDroppableContainer(
  entryUuid: string,
  componentType: ComponentType,
  entryIndex?: React.MutableRefObject<number | undefined>,
): [ConnectDropTarget, DroppableCollectedProps] {
  const pmBuilderService = getGlobalInstance(PMBuilderService);
  const droppableComponentTypes = PMDragNDropService.getDroppableComponentAcceptTypes(componentType);

  const [{ isOver }, dropConnector] = useDrop<DndPayload, unknown, DroppableCollectedProps>(() => ({
    accept: Object.values(ComponentType),
    hover: (item: DndPayload, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        if (monitor.canDrop()) {
          console.log('can drop ', componentType, monitor.getItemType());
        }
        console.log('type', monitor.getItemType());
        console.log('hover', componentType, item, monitor.getItem());
        console.log('entryIndex', entryIndex);
      }
    },
    canDrop: (item, monitor) => {
      const itemType = monitor.getItemType() as ComponentType;
      return !!itemType && droppableComponentTypes.includes(itemType);
    },
    drop: (item: DndPayload, monitor) => {
      if (monitor.didDrop()) {
        // Component was dropped on a nested droppable component
        return;
      }

      if (item.componentId) {
        pmBuilderService.addEntry(item.componentId!, entryUuid);
      } else {
        let newIndex;

        if(!entryIndex || droppableComponentTypes.)
        console.log('item', item);
        console.log('item', monitor.getItem());
        console.log('item', monitor.getDropResult());
        console.log('dropped on ', componentType, entryIndex, entryUuid);
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
