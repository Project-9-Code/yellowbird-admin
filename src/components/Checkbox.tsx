import clsx from "clsx";
import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from "react";
import CheckboxIcon from "@/svgs/checkbox.svg";
import SelectedCheckboxIcon from "@/svgs/checkbox-selected.svg";
import RadioIcon from "@/svgs/radio-unselected.svg";
import SelectedRadioIcon from "@/svgs/radio-selected.svg";
import Image from "next/image";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "checkbox" | "radio";
}

export default function Checkbox(props: CheckboxProps) {
  const { type, name, onChange } = props;
  const Icon = getIcon(props.checked, type);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  }, [onChange]);
  const id = props.id ?? name;

  return (
    <label
      className={clsx("flex relative select-none w-6 h-6 cursor-pointer", props.className)}
      htmlFor={id}
    >
      <input
        type={type}
        checked={props.checked}
        onChange={handleChange}
        className={clsx("absolute cursor-pointer h-0 w-0 opacity-0")}
        name={name}
        id={id}
        disabled={props.disabled}
      />
      <Image src={Icon} alt="Checkbox" />
    </label>
  );
}

function getIcon(checked = false, type: "checkbox" | "radio" = "checkbox") {
  if (checked) {
    return type === "checkbox" ? SelectedCheckboxIcon : SelectedRadioIcon;
  } else {
    return type === "checkbox" ? CheckboxIcon : RadioIcon;
  }
}