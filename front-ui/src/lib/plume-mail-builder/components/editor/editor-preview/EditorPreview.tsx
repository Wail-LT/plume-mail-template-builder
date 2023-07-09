import PMComponentWrapper
  from '@lib/plume-mail-builder/components/component-wrapper/PMComponentWrapper';
import useDroppableContainer from '@lib/plume-mail-builder/hooks/drag-n-drop/DroppableContainer';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import { ROOT_ENTRY_UUID } from '@lib/plume-mail-builder/types/mail-builder/PMEntry';
import React from 'react';
import PMBuilderService from '@lib/plume-mail-builder/services/mail/builder/PMBuilderService';
import {
  Body, Container, Head, Html, Preview,
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
  const [dropConnector] = useDroppableContainer(ROOT_ENTRY_UUID, ComponentType.ROOT);

  return (
    <div
      ref={dropConnector}
      title={'editor-preview'}
      className={classNames(scss.editorPreview, className)}
    >
      <Html>
        <Head>{/* TODO MAIL HEAD */}</Head>
        <Preview>{/* TODO MAIL PREVIEW */}</Preview>
        <Body>
          <Container>
            {
              email.map((entry) => (
                <PMComponentWrapper
                  key={entry.uuid}
                  entryUuid={entry.uuid}
                />
              ))
            }
          </Container>
        </Body>
      </Html>
    </div>
  );
}

export default EditorPreview;
