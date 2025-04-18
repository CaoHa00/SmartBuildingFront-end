import React from "react";
import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  control: Control;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export default function FormField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  ...props
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <div>
          <Label htmlFor={name} className="text-white">{label}</Label>
          <Input
            {...field}
            {...props}
            id={name}
            placeholder={placeholder}
            type={type}
            value={value || ""}
            onChange={onChange}
            className="text-white bg-blue-900/75 border-blue-800 focus:border-blue-600"
          />
          {error && (
            <span className="text-sm text-red-300 mt-1">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}