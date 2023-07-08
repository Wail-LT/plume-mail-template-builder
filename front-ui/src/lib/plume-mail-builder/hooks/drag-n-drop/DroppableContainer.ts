import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { DndPayload } from '@lib/plume-mail-builder/types/drag-n-drop/DndPayload';
import { getGlobalInstance } from 'plume-ts-di';
import { useDrop } from 'react-dnd';

export default function useDroppableContainer(
  accept: ComponentType[],
  componentId?: string,
) {
  const pmBuilderService = getGlobalInstance(PMBuilderService);

  const [, dropRef] = useDrop(() => ({
    accept,
    drop: (item: DndPayload) => {
      if (item.isWidget) {
        pmBuilderService.addComponent(item.id);
      }
      // TODO HANDLE MOVING COMPONENT
    },
  }));

  return dropRef;
}
