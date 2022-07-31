//create stage and set width and height

export const STAGE_WIDTH = 12; //12 columns
export const STAGE_HEIGHT = 20; //20 rows

//stage is nested multi-dimensional array
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear']) //clear or merged (meaning on the stage or cleared)
    )

//collision detection
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for(let y = 0; y < player.tetromino.length; y += 1) {
        for(let x = 0; x < player.tetromino[y].length; x += 1) {
            //1. check they we're on an actual tetromino cell
            if(player.tetromino[y][x] !== 0) {
                if(
                    //2. check that movement is within game area height (y)
                    !stage[y + player.pos.y + moveY] || 
                    //3. check that movement is within game area width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || 
                    //4. check that cell we're moving to isn't set to clear (has a block there)
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
};
