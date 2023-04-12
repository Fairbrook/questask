import { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input(props: IInputProps) {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props} />
      <p>{props.error}</p>
    </div>
  );
}
