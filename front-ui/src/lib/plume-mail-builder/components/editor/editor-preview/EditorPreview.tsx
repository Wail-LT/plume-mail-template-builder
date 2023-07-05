import { ComponentManifest } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import React from 'react';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import PMComponentsService from '@lib/plume-mail-builder/services/components/PMComponentsService';
import { DRAGGABLE_WIDGET_TYPE } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import {
  Body, Head, Html, Preview,
} from '@react-email/components';
import classNames from 'classnames';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import { useDrop } from 'react-dnd';
import scss from './editor-preview.module.scss';

type Props = {
  className?: string;
};

function EditorPreview({ className }: Props) {
  const pmBuilderService = getGlobalInstance(PMBuilderService);
  const pmComponentsService = getGlobalInstance(PMComponentsService);
  const email = useObservable(pmBuilderService.getEmailBody());

  const [, dropRef] = useDrop(() => ({
    accept: DRAGGABLE_WIDGET_TYPE,
    drop: (item: { id: string }) => {
      pmBuilderService.addComponent(item.id);
    },
  }));

  return (
    <div
      ref={dropRef}
      title={'editor-preview'}
      className={classNames(scss.editorPreview, className)}
    >
      <Html>
        <Head>{/* TODO MAIL HEAD */}</Head>
        <Preview>{/* TODO MAIL PREVIEW */}</Preview>
        <Body>
          {
            email.map((serializedComponent) => {
              const componentManifest: ComponentManifest | undefined = pmComponentsService
                .findComponentById(serializedComponent.componentId);
              if (!componentManifest) {
                return null;
              }
              const ComponentRender = componentManifest.component;

              return <ComponentRender key={serializedComponent.uuid} {...componentManifest.defaultProps} />;
            })
          }
        </Body>
      </Html>
    </div>
  );
}

export default EditorPreview;
