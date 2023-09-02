import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type PMEntry = PMSimpleEntry | PMEntryWithChildren;

type PMEntryWithChildren = PMBaseEntry & {
  type: typeof ComponentType.ROOT | typeof ComponentType.SECTION | typeof ComponentType.COLUMN,
  childrenEntriesUuids: string[],
};

type PMSimpleEntry = PMBaseEntry & {
  type: typeof ComponentType.CONTENT,
  childrenEntriesUuids: undefined,
};

type PMBaseEntry = {
  uuid: string,
  componentId: string,
  parentEntryUuid: string | undefined,
  index?: number,
};

const ROOT_ENTRY_UUID = 'root';
const ROOT_ENTRY: PMEntryWithChildren = {
  uuid: ROOT_ENTRY_UUID,
  type: ComponentType.ROOT,
  componentId: 'pm_root',
  childrenEntriesUuids: [],
  parentEntryUuid: undefined,
};

export type { PMEntry, PMSimpleEntry, PMEntryWithChildren };
export { ROOT_ENTRY_UUID, ROOT_ENTRY };
