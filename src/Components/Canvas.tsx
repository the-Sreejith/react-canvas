import { DndContext, useDroppable } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { select } from "d3-selection";
import { ZoomTransform, zoom } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { CanvasElement } from "../types/CanvasElement";
import { Draggable } from "./Draggable";
import { ToolType } from "../types/ToolType";

export const Canvas = ({
  elements,
  setElements,
  transform,
  setTransform,
  activeTool,
  onCanvasClick,
}: {
  elements: CanvasElement[];
  setElements: (cards: CanvasElement[]) => void;
  transform: ZoomTransform;
  setTransform(transform: ZoomTransform): void;
  activeTool: ToolType;
  onCanvasClick: (x: number, y: number) => void;
}) => {
  const updateDraggedElementPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    setElements(
      elements.map((element) => {
        if (element.id === active.id) {
          return {
            ...element,
            coordinates: {
              x: element.coordinates.x + delta.x / transform.k,
              y: element.coordinates.y + delta.y / transform.k,
            },
          };
        }
        return element;
      })
    );
  };

  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const updateAndForwardRef = (div: HTMLDivElement) => {
    canvasRef.current = div;
    setNodeRef(div);
  };

  // create the d3 zoom object, and useMemo to retain it for rerenders
  const zoomBehavior = useMemo(() => zoom<HTMLDivElement, unknown>(), []);

  // update the transform when d3 zoom notifies of a change
  const updateTransform = useCallback(
    ({ transform }: { transform: ZoomTransform }) => {
      setTransform(transform);
    },
    [setTransform]
  );

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    zoomBehavior.on("zoom", updateTransform);
    select<HTMLDivElement, unknown>(canvasRef.current).call(zoomBehavior);
  }, [zoomBehavior, canvasRef, updateTransform, activeTool]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (activeTool === "move") return; // Allow normal pan behavior for move tool

    // Calculate the position in canvas coordinates
    const x = (e.clientX - transform.x) / transform.k;
    const y = (e.clientY - transform.y) / transform.k;

    onCanvasClick(x, y);
  };

  return (
    <div ref={updateAndForwardRef} className="canvasWindow">
      <div
        className="canvas"
        style={{
          // apply the transform from d3
          transformOrigin: "top left",
          transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.k}px)`,
          position: "relative",
          height: "100vh",
          cursor: activeTool === "square" ? "crosshair" : "default",
        }}
        onClick={handleCanvasClick}
      >
        <DndContext onDragEnd={updateDraggedElementPosition}>
          {elements.map((element) => (
            <Draggable
              element={element}
              key={element.id}
              canvasTransform={transform}
              activeTool={activeTool}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
