import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { Logger } from 'simple-logging-system';

const logger = new Logger('PMDragNDropService');

/**
 * Service storing the state of the current mail template.
 */
export default class PMDragNDropService {
  static readonly DroppableComponentAcceptTypes = new Map<ComponentType, ComponentType[]>()
    .set(ComponentType.ROOT, [ComponentType.SECTION, ComponentType.COLUMN, ComponentType.CONTENT])
    .set(ComponentType.SECTION, [ComponentType.COLUMN, ComponentType.CONTENT])
    .set(ComponentType.COLUMN, [ComponentType.CONTENT]);

  private static draggingState: {
    elementId: string,
    newParentUuid?: string,
    newIndex?: number
  } | undefined;

  public static startDragging(elementId: string): void {
    PMDragNDropService.draggingState = {
      elementId,
    };
  }

  public static stopDragging(elementId: string): void {
    if (!PMDragNDropService.draggingState) {
      logger.warn('Dragging state empty');
      return;
    }

    if (elementId !== PMDragNDropService.draggingState?.elementId) {
      logger.error('Trying to stop dragging an item that is not being dragged', {
        draggingState: PMDragNDropService.draggingState,
        elementToStop: elementId,
      });
      return;
    }

    PMDragNDropService.draggingState = undefined;
  }

  static isDroppableComponent(componentType: ComponentType): boolean {
    return !!PMDragNDropService.DroppableComponentAcceptTypes.get(componentType);
  }

  static getDroppableComponentAcceptTypes(componentType: ComponentType) {
    return PMDragNDropService.DroppableComponentAcceptTypes.get(componentType) ?? [];
  }
}
