import { EditableStyle, pmButtonStyle } from '@lib/plume-mail-builder/components/mail-components/button/PMButton.style';
import { PMComponentProps } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import React, { ForwardedRef, forwardRef } from 'react';
import { Button as RMButton } from '@react-email/components';

type RMButtonContent = { label: string; href: string; };
type PMButtonProps = PMComponentProps<RMButtonContent, EditableStyle>;

const PM_BUTTON_DEFAULT_PROPS: PMButtonProps = {
  label: 'Click me',
  href: '#',
  style: {},
};

const PMButton = ({
  label,
  href,
  style,
}: PMButtonProps,
ref: ForwardedRef<HTMLAnchorElement>,
) => (
  <>
    <RMButton
      ref={ref}
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
export default forwardRef<HTMLAnchorElement, PMButtonProps>(PMButton);
