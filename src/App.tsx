import {
  ClientRect,
  DndContext,
  Over,
} from "@dnd-kit/core";
import { Coordinates, DragEndEvent, Translate } from "@dnd-kit/core/dist/types";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { useState } from "react";
import "./App.css";
import { Canvas } from "./Components/Canvas";
import Toolbar from "./Components/Toolbar";
import { ToolType } from "./types/ToolType";
import { CanvasElement } from "./types/CanvasElement";

const calculateCanvasPosition = (
  initialRect: ClientRect,
  over: Over,
  delta: Translate,
  transform: ZoomTransform
): Coordinates => ({
  x:
    (initialRect.left + delta.x - (over?.rect?.left ?? 0) - transform.x) /
    transform.k,
  y:
    (initialRect.top + delta.y - (over?.rect?.top ?? 0) - transform.y) /
    transform.k,
});

export const App = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [elementCounter, setElementCounter] = useState(1);

  // store the current transform from d3
  const [transform, setTransform] = useState(zoomIdentity);

  const addDraggedTrayElementToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;

    setElements([
      ...elements,
      {
        id: active.id.toString(),
        type: 'square', // Defaulting to square for now, can be dynamic
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ),
        width: 100,
        height: 100,
        fillColor: "blue",
      },
    ]);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (activeTool === 'square') {
      const newElementId = `element-${elementCounter}`;
      setElementCounter(prev => prev + 1);
      
      setElements([
        ...elements,
        {
          id: newElementId,
          type: 'square',
          coordinates: { x, y },
          width: 100,
          height: 100,
          fillColor: "red",
        },
      ]);
    }
  };

  return (
    <DndContext
      onDragStart={({ active }) => console.log(active.id)}
      onDragEnd={addDraggedTrayElementToCanvas}
    >
      <Toolbar 
        activeTool={activeTool} 
        setActiveTool={setActiveTool} 
      />
      <Canvas
        elements={elements}
        setElements={setElements}
        transform={transform}
        setTransform={setTransform}
        activeTool={activeTool}
        onCanvasClick={handleCanvasClick}
      />
    </DndContext>
  );
};
