# To Do

1. La aplicaci�n como ejecutable.
2. Trabajar en Game.
3. Tablero del juego de ajedrez.
4. Trabajar en la clase Piece. 

## Orden
1. Piezas:
	1. Afil.
	2. Caballo.
	3. Torre.
	4. Dama.
	5. Rey.
	6. Pe�n. 
2. L�gica del juego:
    0. Posici�n de las piezas.
	1. Captura de piezas. 
	2. Comprobar jaque mate.
	3. Comprobar empate.
	4. Tiempo de partida.
	5. Jugadas.
	6. Puntos.
	7. Turnos.

## Especificaciones del proyecto
- Ser lo m�s implicito posible con los tipos de datos.
- No usar el `any`.
- Usar el `;`.
- Puro backend para empezar.

## Fase: Piece
- [X] Crear la clase `Piece`.
- [ ] Implementar la notaci�n de coordenadas y movimientos.
- [X] Crear el m�todo `getPossibleMoves`.

## Fase: Bishop
- [X] Crear la clase `Bishop`.
- [X] Hacer que herede de `Piece`.
- [X] Hacer que la pieza se mueva a cualquier casilla.
- [X] Que funcionen los clicks.
- [X] Que funcionen las capturas.
- [X] Reescribir el m�todo `getPossibleMoves`.
- [X] Validar los clicks.

## Fase: Knight // Soria
- [X] Crear la clase `Knight`.

## Fase: Rook // Miguel
- [X] Crear la clase `Rook`.

## Fase: King
- [X] Crear la clase `King`.
- [ ] Implementar el movimiento del rey.
- [ ] Limitar el movimiento del rey.
- [ ] Implementar el jaque.
- [ ] Implementar el jaque mate.

## Fase: Pawn // Miguel
- [X] Crear la clase `Pawn`.
- [X] Captura al paso.
- [X] Coronar peones. 

## Interacción entre piezas // Soria
- [ ] Verificar jaques del `King`
- [ ] Crear interacción entre `King` y `Rook`.
