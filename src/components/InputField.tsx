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
  defaultValue?: string | number | readonly string[];
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputField(props: InputFieldProps) {
  const disabled = props.disabled ? "bg-black/[0.12]" : "";
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
        defaultValue={props.defaultValue}
        required={props.required}
        readOnly={props.readonly}
        disabled={props.disabled}
        onChange={props.onChange}
        className={clsx("p-2 rounded ring-1 ring-black/[0.12]", disabled)}
      />
    </div>
  );
}