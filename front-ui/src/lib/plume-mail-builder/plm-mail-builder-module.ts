import MailBuilderService from '@lib/plume-mail-builder/services/mail-builder/MailBuilderService';
import MailComponentsService from '@lib/plume-mail-builder/services/mail-builder/MailComponentsService';
import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { Injector } from 'plume-ts-di';

export default function installPlmMailBuilderModule(injector: Injector, componentsManifests: ComponentManifest[] = []) {
  injector.registerSingleton(MailBuilderService);
  injector.registerSingleton(MailComponentsService);

  /* Register custom components */
  const mailComponentsService = injector.getInstance(MailComponentsService);
  mailComponentsService.registerCustomComponents(componentsManifests);
  mailComponentsService.loadMailComponents();
}
