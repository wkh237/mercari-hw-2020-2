import React, { useState } from "react";

interface InputProps {
  setUserInput: React.Dispatch<string>;
};

export default function Input({ setUserInput }: InputProps) {
  const [value, setInputValue] = useState<string>('false');
  return (
    <input type="text" onChange={e => {
      setInputValue(e.target.value);
    }} onKeyDown={e => {
      if(e.keyCode === 32) {
        setUserInput(value);
      }
    }}/>
  );
}
