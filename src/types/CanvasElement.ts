import {
    UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates} from "@dnd-kit/core/dist/types";

export type CanvasElementType = 'select' | 'square' | 'circle' | 'text' | 'flow' | 'move';

export interface BaseCanvasElement {
  id: UniqueIdentifier;
  coordinates: Coordinates;
}

// Specific element types
export interface SquareElement extends BaseCanvasElement {
  type: 'square';
  width: number;
  height: number;
  fillColor?: string;
}

export interface CircleElement extends BaseCanvasElement {
  type: 'circle';
  radius: number;
  strokeColor?: string;
}

export interface TextElement extends BaseCanvasElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily?: string;
}

export interface FlowElement extends BaseCanvasElement {
  type: 'flow';
  path: { x: number; y: number }[];
  lineWidth: number;
  color?: string;
}

export interface MoveElement extends BaseCanvasElement {
  type: 'move';
  deltaX: number;
  deltaY: number;
}

export interface SelectElement extends BaseCanvasElement {
  type: 'select';
  selectionBox: { width: number; height: number };
}

// Define a union type for all elements
export type CanvasElement =
  | SquareElement
  | CircleElement
  | TextElement
  | FlowElement
  | MoveElement
  | SelectElement;
