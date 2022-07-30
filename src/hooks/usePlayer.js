import { useState } from "react";

import { randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    // get two values back: state and state setter (combined way to set the values)
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false
    });

    return [player];
}