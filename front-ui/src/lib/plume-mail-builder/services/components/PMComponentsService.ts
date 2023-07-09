import {
  UnknownComponentManifest,
} from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { ComponentWidget } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import { componentManifests } from '../../components/pm-components';

/**
 * Service storing the state of the current mail template.
 */
export default class PMComponentsService {
  private readonly customComponents: UnknownComponentManifest[] = [];

  private componentsById: Map<string, UnknownComponentManifest> = new Map();

  public registerCustomComponents(
    componentsManifests: UnknownComponentManifest[],
  ) {
    this.customComponents.push(...componentsManifests);
  }

  public loadMailComponents() {
    this.flushLoadedComponents();
    this.customComponents.forEach(this.loadComponent.bind(this));
    componentManifests.forEach(this.loadComponent.bind(this));
  }

  public getWidgets(): ComponentWidget[] {
    return [...this.componentsById.values()].map((componentManifest) => ({
      id: componentManifest.id,
      widgetTitle: componentManifest.widgetTitle,
      widgetIcon: componentManifest.widgetIcon,
      widgetType: componentManifest.type,
    }))
      .sort((widgetA: ComponentWidget, widgetB: ComponentWidget) => (
        widgetA.widgetTitle.localeCompare(widgetB.widgetTitle)
      ));
  }

  public findComponentById(componentId: string) {
    return this.componentsById.get(componentId);
  }

  /* PRIVATE */
  private loadComponent(componentManifest: UnknownComponentManifest) {
    this.componentsById.set(componentManifest.id, componentManifest);
  }

  private flushLoadedComponents() {
    this.componentsById = new Map();
  }
}
