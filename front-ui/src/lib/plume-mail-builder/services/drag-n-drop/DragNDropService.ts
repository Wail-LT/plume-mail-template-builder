import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

/**
 * Service storing the state of the current mail template.
 */
export default class PMDragNDropService {
  static readonly DroppableComponentAcceptTypes = new Map<ComponentType, ComponentType[]>()
    .set(ComponentType.ROOT, [ComponentType.SECTION, ComponentType.COLUMN, ComponentType.CONTENT])
    .set(ComponentType.SECTION, [ComponentType.COLUMN, ComponentType.CONTENT])
    .set(ComponentType.COLUMN, [ComponentType.CONTENT]);

  static isDroppableComponent(componentType: ComponentType): boolean {
    return !!PMDragNDropService.DroppableComponentAcceptTypes.get(componentType);
  }

  static getDroppableComponentAcceptTypes(componentType: ComponentType) {
    return PMDragNDropService.DroppableComponentAcceptTypes.get(componentType) ?? [];
  }
}
