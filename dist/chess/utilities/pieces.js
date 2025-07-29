export function isInsideBoard(pos) {
    return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
}
export function getPieceAt(pos, board) {
    return board.find(p => p.position.x === pos.x && p.position.y === pos.y) || null;
}
export function isOccupied(pos, board) {
    return getPieceAt(pos, board) !== null;
}
export function isEnemy(pos, board, color) {
    const piece = getPieceAt(pos, board);
    return piece !== null && piece.color !== color;
}
export function isOccupiedByAlly(pos, board, color) {
    const piece = getPieceAt(pos, board);
    return piece !== null && piece.color === color;
}
export function isAttacked(pos, color, board) {
    for (const piece of board) {
        if (piece.color !== color)
            continue;
        const moves = piece.getRawMoves(board);
        if (moves.some(m => m.x === pos.x && m.y === pos.y)) {
            return true;
        }
    }
    return false;
}
