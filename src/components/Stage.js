import React from 'react';
import { StyledStage } from './styles/StyledStage';

import Cell from './Cell';

const Stage = ({ stage }) => ( //prop called stage
    <StyledStage width={stage[0].length} height={stage.length}>
        {/* map through stage array to get row array. Map through row array to get cell x value */}
        {/* there are no occupied cells so set to 0 */}
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
)

export default Stage;