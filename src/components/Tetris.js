import React from 'react';

import { createStage } from '../gameHelpers';

//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => { //use curly brackets because there is more logic

    return (
        <div>
            <Stage stage={createStage()} />
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