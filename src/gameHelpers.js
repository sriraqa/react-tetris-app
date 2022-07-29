//create stage and set width and height

export const STAGE_WIDTH = 12; //12 columns
export const STAGE_HEIGHT = 20; //20 rows

//stage is nested multi-dimensional array
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear']) //clear or merged (meaning on the stage or cleared)
    )
