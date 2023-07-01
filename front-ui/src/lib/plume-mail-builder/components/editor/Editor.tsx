import EditorPanel from '@lib/plume-mail-builder/components/editor/editor-panel/EditorPanel';
import EditorPreview from '@lib/plume-mail-builder/components/editor/editor-preview/EditorPreview';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import scss from './editor.module.scss';

type Props = {};

function Editor({}: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={scss.mailEditor}>
        <EditorPanel />
        <EditorPreview className={scss.editor__preview} />
      </div>
    </DndProvider>
  );
}

export default Editor;
