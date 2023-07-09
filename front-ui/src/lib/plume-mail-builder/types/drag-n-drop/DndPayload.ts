type DndPayload = {
  componentId?: string,
  entryUuid?: string,
  isWidget?: boolean,
};

type DndCollectedProps = { isOver: boolean };

export type { DndPayload, DndCollectedProps };
