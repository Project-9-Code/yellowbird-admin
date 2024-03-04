import clsx from "clsx";
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";

interface InputFieldProps {
  id?: string;
  label?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  labelActions?: ReactNode;
  containerClass?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  readonly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputField(props: InputFieldProps) {
  return (
    <div className={clsx("flex flex-col", props.containerClass)}>
      <div className="flex flex-row justify-between mb-1 items-center">
        <label htmlFor={props.id} className="text-xs text-bodyText font-medium">
          {props.label}
        </label>
        {props.labelActions}
      </div>

      <input
        id={props.id}
        name={props.id}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        min={props.min}
        max={props.max}
        required={props.required}
        readOnly={props.readonly}
        onChange={props.onChange}
        className="p-2 rounded ring-1 ring-black/[0.12]"
      />
    </div>
  );
}