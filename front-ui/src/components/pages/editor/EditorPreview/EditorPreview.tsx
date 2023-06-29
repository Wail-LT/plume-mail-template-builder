import classNames from 'classnames';
import React from 'react';
import scss from './editor-preview.module.scss';

type Props = {
  className?: string;
};

function EditorPreview({ className }: Props) {
  return (
    <div className={classNames(scss.editorPreview, className)}>
      editor preview
    </div>
  );
}

export default EditorPreview;
