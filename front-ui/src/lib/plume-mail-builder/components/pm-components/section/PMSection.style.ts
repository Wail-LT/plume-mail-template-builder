import { CSSProperties } from 'react';
import styleVariables from '@lib/plume-mail-builder/common-style/styleTsVariables';

export const PMSectionStyle: CSSProperties = {
  backgroundColor: styleVariables.greyLight,
  paddingInline: styleVariables.spacing6,
  paddingBlock: styleVariables.spacing6,
  fontFamily: styleVariables.baseFontFamily,
};

export type EditableStyle = {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
};
