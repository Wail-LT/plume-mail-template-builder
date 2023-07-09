import {
  ForwardRefExoticComponent, PropsWithChildren, RefAttributes,
} from 'react';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';

type UnknownComponentManifest = ComponentManifest<object, object | undefined, HTMLElement>;

type ComponentManifest<P extends object, S extends object | undefined, R extends HTMLElement> = {
  id: string,
  type: ComponentType,
  widgetTitle: string,
  widgetIcon: (props: unknown) => JSX.Element,
  // TODO CHECK IF THERE IS A BETTER TYPE
  component: ForwardRefExoticComponent<PMComponentProps<P, S> & RefAttributes<R>>
  defaultProps: PMComponentProps<P, S>,
  editorForm: (props: unknown) => JSX.Element,
  styleLoader?: () => Promise<typeof import('*?inline')>,
};

type PMComponentProps<T extends object, S extends object | undefined> = T & PropsWithChildren<{
  style?: S
}>;

export type { ComponentManifest, UnknownComponentManifest, PMComponentProps };
