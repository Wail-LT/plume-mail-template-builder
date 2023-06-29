import React from 'react';
import classNames from 'classnames';
import scss from './editor-panel.module.scss';

type Props = {
  className?: string;
};

function EditorPanel({ className }: Props) {
  return (
    <div className={classNames(scss.editor_test3, className)}>
      editor panel
    </div>
  );
}

export default EditorPanel;
