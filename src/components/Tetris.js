import React from 'react';

//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => { //use curly brackets because there is more logic

    return (
        <div>
            <Stage />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                {/* callback prompt */}
                <StartButton />
            </aside>
        </div>
    );
};

export default Tetris;