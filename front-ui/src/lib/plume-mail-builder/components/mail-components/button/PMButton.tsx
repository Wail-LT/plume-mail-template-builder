import { EditableStyle, pmButtonStyle } from '@lib/plume-mail-builder/components/mail-components/button/PMButton.style';
import React from 'react';
import { PMComponentProps } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import { Button as RMButton } from '@react-email/components';

const PM_BUTTON_DEFAULT_PROPS: PMButtonProps = {
  label: 'Click me',
  href: '#',
  style: {},
};

type PMButtonContent = { label: string; href: string; };
type PMButtonProps = PMComponentProps<PMButtonContent, EditableStyle>;

const PMButton = ({
  label,
  href,
  style,
}: PMButtonProps) => (
  <>
    <RMButton
      href={href}
      target="_blank"
      style={{ ...pmButtonStyle, ...style }}
      pX={pmButtonStyle.paddingInline as number}
      pY={pmButtonStyle.paddingBlock as number}
    >
      {label}
    </RMButton>
  </>
);

export { PM_BUTTON_DEFAULT_PROPS };
export type { PMButtonProps };
export default PMButton;
