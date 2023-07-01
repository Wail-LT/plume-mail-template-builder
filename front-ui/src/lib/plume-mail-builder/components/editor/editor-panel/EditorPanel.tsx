import Widget from '@lib/plume-mail-builder/components/editor/editor-panel/widget/Widget';
import MailComponentsService from '@lib/plume-mail-builder/services/mail-builder/MailComponentsService';
import { ComponentWidget } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import scss from './editor-panel.module.scss';

type Props = {
  className?: string;
};

function EditorPanel({ className }: Props) {
  const mailComponentsService = getGlobalInstance(MailComponentsService);
  const widgets: ComponentWidget[] = useMemo(() => mailComponentsService.getWidgets(), []);

  return (
    <div className={classNames(scss.editorPanel, className)}>
      {
        widgets.map((widget: ComponentWidget) => (
          <Widget
            key={widget.id}
            className={scss.widget}
            id={widget.id}
            title={widget.widgetTitle}
            icon={widget.widgetIcon}
          />
        ))
      }
    </div>
  );
}

export default EditorPanel;
