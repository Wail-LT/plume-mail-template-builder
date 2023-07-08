import {
  useDraggableWidget,
} from '@lib/plume-mail-builder/hooks/drag-n-drop/DraggableComponent';
import { ComponentType } from '@lib/plume-mail-builder/types/component/ComponentType';
import classNames from 'classnames';
import React from 'react';
import scss from './widget.module.scss';

type WidgetProps = {
  id: string;
  title: string;
  icon: (props: unknown) => JSX.Element;
  type: ComponentType
  className?: string
};

function Widget({
  id, title, icon, type, className,
}: WidgetProps) {
  const WidgetIcon = icon;
  const dragRef = useDraggableWidget(id, type);

  return (
    <div
      ref={dragRef}
      className={classNames(scss.widget, className)}
    >
      <WidgetIcon />
      <p>{title}</p>
    </div>
  );
}

export type { WidgetProps };
export default Widget;
