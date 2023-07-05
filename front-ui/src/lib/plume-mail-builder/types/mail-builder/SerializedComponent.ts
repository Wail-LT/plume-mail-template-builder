import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type SerializedComponent = SerializedContentComponent | SerializedSectionComponent;
type SerializedContentComponent = SerializedBaseComponent;
type SerializedSectionComponent = SerializedBaseComponent & {
  children: SerializedComponent[],
};

type SerializedBaseComponent = {
  uuid: string,
  type: ComponentType,
  componentId: string,
};

export type { SerializedComponent, SerializedContentComponent, SerializedSectionComponent };
