import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            //need to flush stage first
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            //redraw tetrominos
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0) {
                        // set stage coordinates
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            //check is we collided
            if(player.collided) {
                resetPlayer();
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage];
};