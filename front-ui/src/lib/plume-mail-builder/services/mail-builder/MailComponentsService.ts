import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { ComponentWidget } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import { componentManifests } from '@lib/plume-mail-builder/components/mail-components';

/**
 * Service storing the state of the current mail template.
 */
export default class MailComponentsService {
  private componentWidgets: ComponentWidget[] = [];

  private componentsById: Map<string, () => JSX.Element> = new Map();

  private componentFormsById: Map<string, () => JSX.Element> = new Map();

  private readonly customComponents: ComponentManifest[] = [];

  public registerCustomComponents(componentsManifests: ComponentManifest[]) {
    this.customComponents.push(...componentsManifests);
  }

  public loadMailComponents() {
    this.flushLoadedComponents();
    this.customComponents.forEach(this.loadComponent.bind(this));
    componentManifests.forEach(this.loadComponent.bind(this));
  }

  public getWidgets(): ComponentWidget[] {
    return this.componentWidgets;
  }

  /* PRIVATE */
  private loadComponent(componentManifest: ComponentManifest) {
    this.componentsById.set(componentManifest.id, componentManifest.component);
    this.componentFormsById.set(componentManifest.id, componentManifest.editorForm);
    this.componentWidgets.push({
      id: componentManifest.id,
      type: componentManifest.type,
      widgetTitle: componentManifest.widgetTitle,
      widgetIcon: componentManifest.widgetIcon,
    });
  }

  private flushLoadedComponents() {
    this.componentWidgets = [];
    this.componentsById = new Map();
    this.componentFormsById = new Map();
  }
}
