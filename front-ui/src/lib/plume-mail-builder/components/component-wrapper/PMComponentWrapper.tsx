import { useDraggableEntry } from '@lib/plume-mail-builder/hooks/drag-n-drop/DraggableComponent';
import useDroppableContainer from '@lib/plume-mail-builder/hooks/drag-n-drop/DroppableContainer';
import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import PMDragNDropService from '@lib/plume-mail-builder/services/drag-n-drop/DragNDropService';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import { UnknownComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { PMEntry, PMEntryWithChildren } from '@lib/plume-mail-builder/types/mail-builder/PMEntry';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useRef } from 'react';
import { Logger } from 'simple-logging-system';

type PmComponentWrapperProps = {
  entryUuid: string;
};

const logger = new Logger('PmComponentWrapper');

function PMComponentWrapper({ entryUuid }: PmComponentWrapperProps) {
  const pmComponentsService = getGlobalInstance(PMComponentsService);
  const pmBuilderService = getGlobalInstance(PMBuilderService);

  const componentRef = useRef<HTMLElement>(null);

  const entry: PMEntry | undefined = pmBuilderService.getEntryByUuid(entryUuid);
  const componentManifest: UnknownComponentManifest | undefined = entry
    ? pmComponentsService.findComponentById(entry.componentId)
    : undefined;
  const dragConnector = useDraggableEntry(entryUuid, componentManifest?.type);
  const [dropConnector] = useDroppableContainer(entryUuid, componentManifest?.type);

  if (!componentManifest) {
    logger.warn(`Component with id ${entryUuid} not found`);
    return <></>;
  }

  const PMComponent = componentManifest.component;
  const componentProps = componentManifest.defaultProps;
  const isDroppable = PMDragNDropService.isDroppableComponent(componentManifest.type);

  dragConnector(dropConnector(componentRef));

  return (
    <PMComponent
      ref={componentRef}
      {...componentProps}
    >
      {
        isDroppable
        && (entry as PMEntryWithChildren)
          .childrenEntriesUuids
          .map((childEntryUuid: string) => (
            <PMComponentWrapper
              key={childEntryUuid}
              entryUuid={childEntryUuid}
            />
          ))
      }
    </PMComponent>
  );
}

export default PMComponentWrapper;
