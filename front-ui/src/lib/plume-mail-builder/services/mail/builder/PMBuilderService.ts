import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import {
  PMEntry,
  PMEntryWithChildren,
  ROOT_ENTRY,
  ROOT_ENTRY_UUID,
} from '@lib/plume-mail-builder/types/mail-builder/PMEntry';
import { Observable, observable, WritableObservable } from 'micro-observables';
import { Logger } from 'simple-logging-system';
import { v4 as uuid } from 'uuid';

const logger: Logger = new Logger('MailBuilderService');

const EMPTY_SERIALIZED_COMPONENTS_BY_ID = new Map<string, PMEntry>()
  .set(ROOT_ENTRY_UUID, ROOT_ENTRY);

/**
 * Service storing the state of the current mail template.
 */
export default class PMBuilderService {
  private readonly mailEntriesByUuid: WritableObservable<Map<string, PMEntry>>;

  constructor(private readonly mailComponentsService: PMComponentsService) {
    this.mailEntriesByUuid = observable<Map<string, PMEntry>>(
      new Map(EMPTY_SERIALIZED_COMPONENTS_BY_ID),
    );
  }

  initEmail() {
    this.mailEntriesByUuid.set(new Map(EMPTY_SERIALIZED_COMPONENTS_BY_ID));
  }

  addEntry(componentId: string, targetEntryUuid: string = ROOT_ENTRY_UUID) {
    const component = this.mailComponentsService.findComponentById(componentId);
    const targetEntry: PMEntry | undefined = this.getEntryByUuid(targetEntryUuid);
    if (!component) {
      logger.error(`Component with id ${componentId} not found`);
      // FIXME : handle the error properly
      return;
    }

    if (!targetEntry) {
      logger.error(`Target component with id ${targetEntryUuid} not found in the mail entries`);
      // FIXME : handle the error properly
      return;
    }

    if (targetEntry.type === ComponentType.CONTENT) {
      logger.error(`Target component with id ${targetEntryUuid} is not a container`);
      // FIXME : handle the error properly
      return;
    }

    this.mailEntriesByUuid.update((entriesByUuid) => {
      const newEntry: PMEntry = {
        uuid: uuid(),
        type: component.type,
        componentId: component.id,
        childrenEntriesUuids: component.type !== ComponentType.CONTENT ? [] : undefined,
        parentEntryUuid: targetEntryUuid,
        index: targetEntry.childrenEntriesUuids.length,
      } as PMEntry;

      // 1. Add the new component to the serialized components
      entriesByUuid.set(newEntry.uuid, newEntry);

      // 2. Add the new component to the children of the target component
      (targetEntry as PMEntryWithChildren)
        .childrenEntriesUuids
        .push(newEntry.uuid);

      return new Map(entriesByUuid);
    });
  }

  loadEmail() {
    throw new Error('Not implemented');
  }

  getEmailBody(): Observable<PMEntry[]> {
    return this.mailEntriesByUuid.select((entriesByUuid: Map<string, PMEntry>) => (
      (entriesByUuid.get(ROOT_ENTRY_UUID) as PMEntryWithChildren)
        .childrenEntriesUuids
        .reduce((acc, childComponentId: string) => {
          const serializedComponent = entriesByUuid.get(childComponentId);
          if (serializedComponent) {
            acc.push(serializedComponent);
          }
          return acc;
        }, [] as PMEntry[])
    ));
  }

  getUsedComponents() {
    const componentsIds = new Set<string>();

    for (const entry of this.mailEntriesByUuid.get().values()) {
      componentsIds.add(entry.componentId);
    }

    return componentsIds;
  }

  getEntryByUuid(entryUuid: string) {
    const entry = this.mailEntriesByUuid.get().get(entryUuid);

    if (!entry) {
      logger.error(`Component with uuid ${entryUuid} not found in the mail entries`);
    }

    return entry;
  }
}
