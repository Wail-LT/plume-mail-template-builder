import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type PMEntry = PMSimpleEntry | PMEntryWithChildren;

type PMEntryWithChildren = PMSimpleEntry & {
  childrenEntriesUuids: string[],
};

type PMSimpleEntry = {
  uuid: string,
  type: ComponentType,
  componentId: string,
};

const ROOT_ENTRY_UUID = 'root';
const ROOT_ENTRY: PMEntryWithChildren = {
  uuid: ROOT_ENTRY_UUID,
  type: ComponentType.ROOT,
  componentId: 'pm_root',
  childrenEntriesUuids: [],
};

export type { PMEntry, PMSimpleEntry, PMEntryWithChildren };
export { ROOT_ENTRY_UUID, ROOT_ENTRY };
