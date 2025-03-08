import { useDraggable } from "@dnd-kit/core";
import { Card } from "../types/Card";

export const Addable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });

  return (
    <div className="trayCard" ref={setNodeRef} {...listeners} {...attributes}>
      {card.text}
    </div>
  );
};