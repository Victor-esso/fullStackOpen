import React, { useEffect, useRef } from 'react';

const Input = ({ type, placeholder, value, onChange, className, focus }) => {
  const inputRef = useRef(null);  // Create a ref for the input element

  // Use useEffect to focus the input when the 'focus' prop is true
  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);  // Only run this when the 'focus' prop changes

  const inputProps = {
    ...(placeholder && { placeholder: placeholder }),
    onChange: onChange || (() => {}),
    type: type ? type : 'text',
    value: value ? value : ''
  };

  return (
    <input
      {...inputProps}
      ref={inputRef}  // Attach the ref to the input element
      className={`w-full text-white bg-white/[0.03] focus:bg-white/[0.05] focus-visible:outline-1 focus-visible:outline-white/[.1] focus-visible:outline-offset-0 focus:outline-none rounded-lg py-2 px-3 placeholder:text-white/[.2] ${className || ''}`}
    />
  );
};

export default Input;
