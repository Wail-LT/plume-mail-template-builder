import {
  ForwardRefExoticComponent, RefAttributes,
} from 'react';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type UnknownComponentManifest = ComponentManifest<unknown, unknown, unknown>;

type ComponentManifest<P, S, R> = {
  id: string,
  type: ComponentType,
  widgetTitle: string,
  widgetIcon: (props: unknown) => JSX.Element,
  // TODO CHECK IF THERE IS A BETTER TYPE
  component: ForwardRefExoticComponent<PMComponentProps<P, S> & RefAttributes<R>>
  defaultProps: object,
  editorForm: (props: unknown) => JSX.Element,
  styleLoader?: () => Promise<typeof import('*?inline')>,
};

type PMComponentProps<T, S> = T & {
  style?: S
};

export type { ComponentManifest, UnknownComponentManifest, PMComponentProps };
