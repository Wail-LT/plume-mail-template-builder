import { PMSectionStyle } from '@lib/plume-mail-builder/components/pm-components/section/PMSection.style';
import { PMComponentProps } from '@lib/plume-mail-builder/types/component/ComponentManifest';
import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { Section as RMSection } from '@react-email/components';

type RMSectionContent = PropsWithChildren<{}>;
type PMSectionProps = PMComponentProps<RMSectionContent, {}>;

const PM_SECTION_DEFAULT_PROPS: PMSectionProps = {
  children: undefined,
  style: {},
};

const PMSection = ({ children, style }: PMSectionProps, ref: ForwardedRef<HTMLTableElement>) => (
  <>
    <RMSection
      ref={ref}
      style={{ ...PMSectionStyle, ...style }}
    >
      section
      {children}
    </RMSection>
  </>
);

export { PM_SECTION_DEFAULT_PROPS };
export type { PMSectionProps };
export default forwardRef<HTMLTableElement, PMSectionProps>(PMSection);
