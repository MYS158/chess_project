# To Do

1. La aplicación como ejecutable.
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
	6. Peón. 
2. Lógica del juego:
    0. Posición de las piezas.
	1. Captura de piezas. 
	2. Comprobar jaque mate.
	3. Comprobar empate.
	4. Tiempo de partida.
	5. Jugadas.
	6. Puntos.
	7. Turnos.

## Especificaciones del proyecto
- Ser lo más implicito posible con los tipos de datos.
- No usar el `any`.
- Usar el `;`.
- Puro backend para empezar.

## Fase: Piece
- [X] Crear la clase `Piece`.
- [ ] Implementar la notación de coordenadas y movimientos.
- [X] Crear el método `getPossibleMoves`.
- [ ] Crear el método `getPossibleCaptures`.

## Fase: Bishop
- [X] Crear la clase `Bishop`.
- [X] Hacer que herede de `Piece`.
- [X] Hacer que la pieza se mueva a cualquier casilla.
- [X] Que funcionen los clicks.
- [X] Que funcionen las capturas.
- [X] Reescribir el método `getPossibleMoves`.
- [X] Validar los clicks.

## Fase: Knight // Soria
- [ ] Crear la clase `Knight`.

## Fase: Rook // Miguel
- [ ] Crear la clase `Rook`.