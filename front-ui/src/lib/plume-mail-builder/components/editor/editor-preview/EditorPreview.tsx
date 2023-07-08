import PMComponentWrapper
  from '@lib/plume-mail-builder/components/mail-components/component-wrapper/PMComponentWrapper';
import useDroppableContainer from '@lib/plume-mail-builder/hooks/drag-n-drop/DroppableContainer';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import React from 'react';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import {
  Body, Head, Html, Preview,
} from '@react-email/components';
import classNames from 'classnames';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import scss from './editor-preview.module.scss';

type Props = {
  className?: string;
};

function EditorPreview({ className }: Props) {
  const pmBuilderService = getGlobalInstance(PMBuilderService);

  const email = useObservable(pmBuilderService.getEmailBody());
  const dropRef = useDroppableContainer(Object.values(ComponentType));

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
            email.map((serializedComponent) => (
                <PMComponentWrapper
                  key={serializedComponent.uuid}
                  componentId={serializedComponent.componentId}
                />
            ))
          }
        </Body>
      </Html>
    </div>
  );
}

export default EditorPreview;
