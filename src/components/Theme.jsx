import styled from 'styled-components'

export const Button = styled.button`
    background-color: rgba(0,163,165, 1.0);
    margin-top: 16px;
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    border-radius: 3px;
    border: 0;
    margin: 10px;
    cursor: pointer;

    &:active {
        transform: translateY(2px);
    }
`

export const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-family: Avenir;
    font-weight: 300;
    height: 30px;
`

export const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-family: Avenir;
    font-weight: 300;
    width: 400px;
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

export const Modal = styled.div`
    width: 496px;
    left: 0px;
    top: 0px;
    background: #fff;
    color: #3d3d46;
    border-radius: 8px;
    font-size: 15px;
    line-height: 22px;
    padding: 24px;
`