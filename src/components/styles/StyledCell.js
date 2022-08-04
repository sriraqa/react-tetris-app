import styled from 'styled-components';

// styled component uses ``
// $ gets props to send into styled components as an inline function
// border shadows
// turner operator (if type is 0, then no border, otherwise solid border)
export const StyledCell = styled.div`
    width: auto;
    background: rgba(${props => props.color}, 1);
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(0,0,0, 0.1);
    border-left-color: rgba(255,255,255, 0.2);
    border-right-color: rgba(0,0,0, 0.05);
    border-top-color: rgba(255,255,255, 0.3);
`