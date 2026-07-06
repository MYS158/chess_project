import { Position } from "../move";

export function isInsideBoard(pos: Position): boolean {
    return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
}