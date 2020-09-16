import React, { useState } from 'react';
import styled from 'styled-components';

interface InputProps {
  setUserInput: React.Dispatch<string>;
}

function Input({ setUserInput }: InputProps) {
  const [value, setInputValue] = useState<string>('false');
  return (
    <StyledContainer>
      <StyledForm>
        <input
          type="text"
          placeholder="keywords separated by spaces .."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              setUserInput(value);
            }
          }}
        />
        <button>Shuffle</button>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  margin-bottom: 24px;
  background-color: inherit;
  button {
    align-self: stretch;
    border-radius: 0;
    border: 0;
    color: #4dc9ff;
    font-size: 10px;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    font-weight: bold;
    text-align: center;
    outline: 0;
    cursor: pointer;
    border: 3px solid #4dc9ff;
    background-color: white;
    &:hover {
      background-color: #4dc9ff;
      color: white;
    }
    &:active {
      opacity: 0.8;
    }
  }
  > input {
    flex: 1;
    padding: 4px 10px;
    margin-right: 8px;
    font-size: 20px;
    border-radius: 12px;
    outline: 0;
    background-color: #efefef;
    width: 100%;
    flex: 1;
    border: 0;
    border: 2px solid transparent;
    &:focus {
      border-color: red;
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export default Input;
