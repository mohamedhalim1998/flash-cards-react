import React from "react";

interface FormParams {
  label: string;
  name: string;
  hint: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ label, name, hint, value, error, onChange }: FormParams) {
  return (
    <div className="text-left container">
      <label
        htmlFor={name}
        className={`block font-medium m-2 ${
          error ? "text-error" : "text-gray-400"
        } `}
      >
        {error || label}
      </label>
      <input
        name={name}
        id={name}
        placeholder={hint}
        type="text"
        value={value}
        onChange={onChange}
        className={`border-2
                  ${error ? "border-error" : "border-gray-400"}
                  m-2 
                  container
                  max-w-xl
                  rounded-md
                  py-2
                  px-3
                  focus:outline-none
                  focus:border-secondary
                  font-normal
                  placeholder-gray-30`}
      />
    </div>
  );
}

export default TextInput;
