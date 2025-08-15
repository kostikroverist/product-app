import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const inputStyles =
  "w-full bg-slate-200 text-slate-900 placeholder-slate-500 rounded-lg p-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500";

const CustomInput: React.FC<CustomInputProps> = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold text-slate-300">
        {label}
      </label>
      <input id={name} name={name} className={inputStyles} {...props} />
    </div>
  );
};

export default CustomInput;
