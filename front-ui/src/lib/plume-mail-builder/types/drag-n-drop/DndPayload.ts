type DndPayload = DndWidgetPayload | DndEntryPayload;

type DndWidgetPayload = {
  componentId: string,
  entryUuid: undefined,
};

type DndEntryPayload = {
  entryUuid: string,
  componentId: undefined,
  index: React.MutableRefObject<number | undefined>,
};

type DraggableCollectedProps = { isDragging: boolean };
type DroppableCollectedProps = { isOver: boolean };

export type { DndPayload, DroppableCollectedProps, DraggableCollectedProps };
