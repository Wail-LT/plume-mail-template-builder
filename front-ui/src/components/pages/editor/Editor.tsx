import EditorPanel from '@components/pages/editor/EditorPanel/EditorPanel';
import EditorPreview from '@components/pages/editor/EditorPreview/EditorPreview';
import React from 'react';
import scss from './editor.module.scss';

type Props = {

};

function Editor({}: Props) {
  return (
    <div className={scss.mailEditor}>
      <EditorPanel/>
      <EditorPreview className={scss.editor__preview}/>
    </div>
  );
}

export default Editor;
