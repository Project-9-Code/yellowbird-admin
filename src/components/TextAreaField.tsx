"use client";

import React from "react";
import clsx from "clsx";
import { ChangeEventHandler, ReactNode } from "react";

interface TextAreaProps {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  labelActions?: ReactNode;
  containerClass?: string;
  required?: boolean;
  readonly?: boolean;
  rows?: number;
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TextAreaField(props: TextAreaProps) {
  return (
    <div className={clsx("flex flex-col", props.containerClass)}>
      <div className="flex flex-row justify-between mb-1 items-center">
        <label htmlFor={props.id} className="text-xs text-bodyText font-medium">
          {props.label}
        </label>
        {props.labelActions}
      </div>

      <textarea
        id={props.id}
        name={props.id}
        value={props.value}
        placeholder={props.placeholder}
        rows={props.rows}
        defaultValue={props.defaultValue}
        required={props.required}
        readOnly={props.readonly}
        onChange={props.onChange}
        className="p-2 rounded ring-1 ring-black/[0.12]"
      />
    </div>
  );
}