import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ callback }) => ( //prop called callback
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
)

export default StartButton;