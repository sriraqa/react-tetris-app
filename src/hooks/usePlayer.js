import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    // get two values back: state and state setter (combined way to set the values)
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //rotate tetromino
    const rotate = (matrix, dir) => {
        //make rows become columns (transpose)
        const rotatedTetro = matrix.map((_, index) => 
        matrix.map(col => col[index]),
        );
        //reverse each row to get a rotated matrix
        if(dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    //check tetromino rotation collision
    const playerRotate = (stage, dir) => {
        //deep clone of player so that player is not mutated
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        //make sure rotate does not go out of bounds or on top of blocks
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1)); //check is there is collision from rotation
            if(offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    //update position of the tetromino
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x + x), y: (prev.pos.y + y)},
            collided,
        }))
    }

    // use call back so that loop does not repeat forever
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}