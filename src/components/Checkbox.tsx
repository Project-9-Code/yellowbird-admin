import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import CheckboxIcon from "@/../public/svgs/checkbox.svg";
import SelectedCheckboxIcon from "@/../public/svgs/checkbox-selected.svg";
import Image from "next/image";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox(props: CheckboxProps) {
  const Icon = (props.checked) ? SelectedCheckboxIcon : CheckboxIcon;

  return (
    <label className={clsx("relative select-none", props.className)} htmlFor={props.name}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        className={clsx("absolute cursor-pointer h-0 w-0 opacity-0")}
        name={props.name}
      />
      <div className="absolute top-0 right-0 h-6 w-6">
        <Image src={Icon} alt="Checkbox" />
      </div>
    </label>
  );
}