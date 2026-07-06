import { Position } from '../move';
import { Color } from '../pieces/pieceTypes';

export interface EnPassantState {
    targetSquare: Position | null;
    eligiblePawnColor: Color | null;
}

let enPassantState: EnPassantState = {
    targetSquare: null,
    eligiblePawnColor: null,
};

export function setEnPassant(fromSquare: Position, toSquare: Position, color: Color) {
    const fromRank = fromSquare.y;
    const toRank = toSquare.y;
    if (Math.abs(toRank - fromRank) === 2) {
        const targetRank = (fromRank + toRank) / 2;
        const targetSquare: Position = new Position(fromSquare.x, targetRank);
        enPassantState = {
            targetSquare,
            eligiblePawnColor: color === 'white' ? 'black' : 'white',
        };
    } else {
        clearEnPassant();
    }
}

export function getEnPassantState(): EnPassantState {
    return { ...enPassantState };
}

export function clearEnPassant() {
    enPassantState = {
        targetSquare: null,
        eligiblePawnColor: null,
    };
}

export function isEnPassantCapture(toSquare: Position, color: Color): boolean {
    if (!enPassantState.targetSquare || enPassantState.eligiblePawnColor !== color) {
        return false;
    }
    return (
        toSquare.x === enPassantState.targetSquare.x &&
        toSquare.y === enPassantState.targetSquare.y
    );
}