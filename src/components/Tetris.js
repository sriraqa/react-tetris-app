import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

//styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

//audio
import waterLoop from './waterloop.wav';
import musicLoop from './musicloop.mp3';
import moveSound from './click.wav';
import rotateSound from './swish.mp3';
var audio1 = new Audio(waterLoop);
var audio3 = new Audio(waterLoop);
var audio2 = new Audio(musicLoop);
var click = new Audio(moveSound);
var swish = new Audio(rotateSound);

const Tetris = () => { //use curly brackets because there is more logic
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(null);
    const [gameStart, setGameStart] = useState(null);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        //if there is no collision, then do the move, otherwise no movement.
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    function playPauseW() {
        if (audio1.paused) {
            audio1.volume = 0.04;
            audio1.play();
            audio1.loop = true;
            setTimeout(() => {
                audio3.volume = 0.04;
                audio3.play();
                audio3.loop = true;
              }, 5000);
        } else {
            audio1.pause(); 
            audio3.pause();
        }
      }

    function playPauseM() {
        if (audio2.paused) {
            audio2.volume = 0.3;
            audio2.play();
            audio2.loop = true;
        } else {
            audio2.pause();
        }
    }
      

    const startGame = () => {
        //reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setGameStart(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        //increase level with 10 rows cleared
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            //increase speed
            setDropTime(1000 / (level + 1) + 200)
        }

        if(!checkCollision(player, stage, { x: 0, y: 1})) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        }
        else {
            if(player.pos.y < 1) {
                console.log("GAME OVER!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver && !gameStart) {
            if(keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        click.volume = 0.4;
        if(!gameOver && !gameStart) {
            if(keyCode === 37) { //right arrow
                movePlayer(-1);
                click.play();
            }
            else if(keyCode === 39) { //left arrow
                movePlayer(1);
                click.play();
            }
            else if(keyCode === 40) { //down arrow
                dropPlayer();
            }
            else if(keyCode === 38) {  //up arrow
                playerRotate(stage, 1);
                swish.play();
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    // wrap div is responsible for movement and clicks

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display gameOver={gameOver} text="Game Over" />
                        </div>
                    ) : (
                        <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    )}
                    {/* callback prompt */}
                    <StartButton callback={startGame} />
                    <div>
                    <button onClick={playPauseM}>Play/Pause Music</button>
                    <button onClick={playPauseW}>Play/Pause Sounds</button>
                    </div>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;