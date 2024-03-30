import Image from "next/image";
import Checkbox from "../Checkbox";
import InputField from "../InputField";
import CloseIcon from "@/svgs/small-x.svg"
import { ChangeEvent, useCallback } from "react";
import Button from "../Button";

export default function ChoiceOption(
  { option, checked, readOnly, type, onOptionChange, onSelectedChange, onRemove }:
  {
    option?: string,
    checked?: boolean;
    readOnly?: boolean;
    type?: "radio" | "checkbox";
    onOptionChange?: (option: string) => void;
    onSelectedChange?: (selected: boolean) => void;
    onRemove?: (option?: string) => void;
  }
) {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onOptionChange?.(e.target.value);
  }, [onOptionChange]);
  const handleSelectedChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSelectedChange?.(e.target.checked);
  }, [onSelectedChange]);
  const handleRemove = useCallback(() => {
    onRemove?.(option);
  }, [onRemove, option]);

  return (
    <div className="flex flex-row items-center mb-2">
      <Checkbox
        name={option}
        type={type ?? "checkbox"}
        className="mr-2"
        checked={checked}
        onChange={handleSelectedChange}
        disabled={readOnly}
      />
      <InputField
        containerClass="grow mr-2"
        value={option}
        onChange={handleChange}
        disabled={readOnly}
      />
      {!readOnly && (
        <Button
          buttonClassName="!w-[10px] !h-[10px] bg-transparent p-0"
          onClick={handleRemove}
        >
          <Image src={CloseIcon} alt="Close" />
        </Button>
      )}
    </div>
  );
}
