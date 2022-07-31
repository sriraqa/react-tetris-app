import { useState, useEffect, useCallBack, useCallback} from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    // console.log(rows)

    const calcScore = useCallback(() => {
        //check score
        if(rowsCleared > 0) {
            //Tetris score calculation
            setRows(prev => prev + rowsCleared);
            setScore(prev => prev + (linePoints[rowsCleared - 1] * (level + 1)));
        }
    }, [level, linePoints, rowsCleared]) ;

    //calls automatically
    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared]);

    return [score, setScore, rows, setRows, level, setLevel];
}