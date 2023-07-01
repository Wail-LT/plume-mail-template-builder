import { DRAGGABLE_WIDGET_TYPE } from '@lib/plume-mail-builder/types/component/ComponentWidget';
import classNames from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';
import scss from './widget.module.scss';

export type WidgetProps = {
  id: string;
  title: string;
  icon: () => JSX.Element;
  className?: string
};

function Widget({
  id, title, icon, className,
}: WidgetProps) {
  const WidgetIcon = icon;
  const [, dragRef] = useDrag(() => ({
    type: DRAGGABLE_WIDGET_TYPE,
    item: { id },
  }));
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

export default Widget;
