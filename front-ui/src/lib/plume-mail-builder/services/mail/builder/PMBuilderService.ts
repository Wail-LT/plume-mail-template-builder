import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import {
  SerializedComponent,
  SerializedSectionComponent,
} from '@lib/plume-mail-builder/types/mail-builder/SerializedComponent';
import { observable, WritableObservable } from 'micro-observables';
import { Logger } from 'simple-logging-system';
import { v4 as uuid } from 'uuid';

const logger: Logger = new Logger('MailBuilderService');

/**
 * Service storing the state of the current mail template.
 */
export default class PMBuilderService {
  private readonly emailBody: WritableObservable<SerializedComponent[]>;

  constructor(private readonly mailComponentsService: PMComponentsService) {
    this.emailBody = observable<SerializedComponent[]>([]);
  }

  initEmail() {
    this.emailBody.set([]);
  }

  addComponent(componentId: string) {
    const component = this.mailComponentsService.findComponentById(componentId);
    if (!component) {
      logger.error(`Component with id ${componentId} not found`);
      // FIXME : handle the error properly
      return;
    }
    this.emailBody.set([...this.emailBody.get(), {
      uuid: uuid(),
      type: component.type,
      componentId: component.id,
      children: component.type === ComponentType.SECTION ? [] : undefined,
    }]);
  }

  loadEmail() {
    this.emailBody.set([]);
    throw new Error('Not implemented');
  }

  getEmailBody() {
    return this.emailBody.readOnly();
  }

  getUsedComponents(serializedComponents?: SerializedComponent[]) {
    const componentsIds = new Set<string>();
    const emailComponents = serializedComponents || this.emailBody.get();

    emailComponents.forEach((component: SerializedComponent) => {
      if ([ComponentType.SECTION, ComponentType.COLUMN].includes(component.type)) {
        this.getUsedComponents((component as SerializedSectionComponent).children)
          .forEach((childComponentId: string) => {
            componentsIds.add(childComponentId);
          });
      }
      componentsIds.add(component.componentId);
    });

    return componentsIds;
  }
}
