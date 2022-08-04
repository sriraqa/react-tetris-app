import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

//audio
import plop from './plop.wav';
var plopSound = new Audio(plop)

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
            newStage.reduce((ack, row) => { //get rows
                console.log(row.findIndex(cell => cell[0] === 0));
                if(row.findIndex(cell => cell[0] === 0) === -1) { //check is any values in the row are clear
                    setRowsCleared(prev => prev + 0.5); //add 1 to rowsCleared state
                    console.log("rows: " + rowsCleared);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear'])); //add empty rows on top
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])

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
                    if(player.collided === true) {
                        plopSound.play();
                    }
                });
            });
            //check if we collided
            if(player.collided) {
                resetPlayer();
                return sweepRows(newStage); //return new stage with swept rows
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};