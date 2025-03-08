import {
    UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates} from "@dnd-kit/core/dist/types";

export type Card = {
    id: UniqueIdentifier;
    coordinates: Coordinates;
    text: string;
};
