import React from 'react';

import Cell from './Cell';

const Stage = ({ stage }) => ( //prop called stage
    <div>
        {/* map through stage array to get row array. Map through row array to get cell x value */}
        {/* there are no occupied cells so set to 0 */}
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
)

export default Stage;