import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import PMRendererService from '@lib/plume-mail-builder/services/mail/renderer/PMRendererService';
import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { Injector } from 'plume-ts-di';

export default function installPlmMailBuilderModule(injector: Injector, componentsManifests: ComponentManifest[] = []) {
  injector.registerSingleton(PMBuilderService);
  injector.registerSingleton(PMComponentsService);
  injector.registerSingleton(PMRendererService);

  /* Register custom components */
  const mailComponentsService = injector.getInstance(PMComponentsService);
  mailComponentsService.registerCustomComponents(componentsManifests);
  mailComponentsService.loadMailComponents();
}
