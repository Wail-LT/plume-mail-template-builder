import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import { UnknownComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { PMEntry } from '@lib/plume-mail-builder/types/mail-builder/PMEntry';
import { render } from '@react-email/components';
import { observable, WritableObservable } from 'micro-observables';
import { Logger } from 'simple-logging-system';

const logger: Logger = new Logger('MailBuilderService');

/**
 * Service storing the state of the current mail template.
 */
export default class PMRendererService {
  private readonly emailBody: WritableObservable<PMEntry[]>;

  constructor(
    private readonly pmBuilderService: PMBuilderService,
    private readonly pmComponentsService: PMComponentsService,
  ) {
    this.emailBody = observable<PMEntry[]>([]);
  }

  async renderEmail(email: JSX.Element) {
    const usedComponentsIds = this.pmBuilderService.getUsedComponents();
    const compiledScss = await this.loadComponentsScss(usedComponentsIds);
    if (!compiledScss) {
      return render(email, { pretty: true });
    }
    const cssTag = `<style>${compiledScss}</style>`;
    const emailHtml = render(email, { pretty: true });

    if (emailHtml.includes('</head>')) {
      return emailHtml.replace('</head>', `${cssTag}</head>`);
    }
    return emailHtml.replace('</html>', `${cssTag}</html>`);
  }

  /* PRIVATE */
  private async loadComponentsScss(componentsIds: Set<string>) {
    const componentsScss: string[] = [];
    const scssLoaders = [...componentsIds.values()].map((componentId: string) => {
      const componentManifest: UnknownComponentManifest | undefined = this.pmComponentsService
        .findComponentById(componentId);

      if (!componentManifest) {
        logger.error(`Component with id ${componentId} not found`);

        // FIXME : handle the error properly
        return Promise.reject();
      }

      if (!componentManifest.styleLoader) {
        return Promise.resolve();
      }

      return componentManifest.styleLoader()
        .then((componentScss) => {
          componentsScss.push(componentScss.default);
        })
        .catch((error) => {
          logger.error('Failed to load component scss', {
            componentId,
            scssLoaders: componentManifest.styleLoader,
            error,
          });
        });
    });

    await Promise.all(scssLoaders);
    return componentsScss.join('\n');
  }
}
