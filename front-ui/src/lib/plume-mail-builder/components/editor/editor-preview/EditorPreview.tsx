import { DRAGGABLE_WIDGET_TYPE } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import scss from './editor-preview.module.scss';

type Props = {
  className?: string;
};

function EditorPreview({ className }: Props) {
  const [, dropRef] = useDrop(() => ({
    accept: DRAGGABLE_WIDGET_TYPE,
    drop: (item, monitor) => {
      console.log('drop', item, monitor);
    },
  }));
  return (
    <div
      ref={dropRef}
      className={classNames(scss.editorPreview, className)}
    >
      editor preview
    </div>
  );
}

export default EditorPreview;
