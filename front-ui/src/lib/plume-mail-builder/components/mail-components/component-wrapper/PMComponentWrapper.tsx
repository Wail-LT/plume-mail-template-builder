import { useDraggableComponent } from '@lib/plume-mail-builder/hooks/drag-n-drop/DraggableComponent';
import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import { UnknownComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { Logger } from 'simple-logging-system';

type PmComponentWrapperProps = {
  componentId: string;
};

const logger = new Logger('PmComponentWrapper');

function PMComponentWrapper({ componentId }: PmComponentWrapperProps) {
  const pmComponentsService = getGlobalInstance(PMComponentsService);
  const componentManifest: UnknownComponentManifest | undefined = pmComponentsService.findComponentById(componentId);
  const dragRef = useDraggableComponent(componentId, componentManifest?.type);

  if (!componentManifest) {
    logger.warn(`Component with id ${componentId} not found`);
    return <></>;
  }

  const PMComponent = componentManifest.component;

  return (
    <PMComponent
      ref={dragRef}
      {...componentManifest.defaultProps}
    />
  );
}
export default PMComponentWrapper;
