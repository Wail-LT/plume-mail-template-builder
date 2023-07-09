import { CSSProperties } from 'react';
import styleVariables from '@lib/plume-mail-builder/common-style/styleTsVariables';

export const pmButtonStyle: CSSProperties = {
  backgroundColor: styleVariables.greyLight,
  paddingInline: styleVariables.spacing6,
  paddingBlock: styleVariables.spacing4,
  fontFamily: styleVariables.baseFontFamily,
  fontWeight: 600,
  borderRadius: '5px',
};

export type EditableStyle = {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
};
