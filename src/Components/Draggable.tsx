import { useDraggable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import { CanvasElement } from "../types/CanvasElement";
import { ToolType } from "../types/ToolType";

export const Draggable = ({
  element,
  canvasTransform,
  activeTool,
}: {
  element: CanvasElement;
  canvasTransform: ZoomTransform;
  activeTool: ToolType;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    disabled: activeTool !== 'select', // Only allow dragging when select tool is active
  });

  return (
    <div
      className="card"
      style={{
        position: "absolute",
        top: `${element.coordinates.y * canvasTransform.k}px`,
        left: `${element.coordinates.x * canvasTransform.k}px`,
        transformOrigin: "top left",
        cursor: activeTool === 'select' ? 'move' : 'default', // Change cursor based on active tool
        ...(transform
          ? {
              // temporary change to this position when dragging
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              // zoom to canvas zoom
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // this stops the event bubbling up and triggering the canvas drag
      onPointerDown={(e) => {
        if (activeTool === 'select') {
          listeners?.onPointerDown?.(e);
          e.preventDefault();
        }
      }}
    >
      {element.type.toString()}
    </div>
  );
};