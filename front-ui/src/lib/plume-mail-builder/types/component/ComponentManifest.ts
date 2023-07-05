import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type ComponentManifest = {
  id: string,
  type: ComponentType,
  widgetTitle: string,
  widgetIcon: (props: unknown) => JSX.Element,
  component: (props: unknown) => JSX.Element,
  defaultProps: PMComponentProps<unknown, unknown>,
  editorForm: (props: unknown) => JSX.Element,
  styleLoader?: () => Promise<typeof import('*?inline')>,
};

type PMComponentProps<T, S> = T & {
  style?: S
};

export type { ComponentManifest, PMComponentProps };
