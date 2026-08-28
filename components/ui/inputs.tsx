"use client";

import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";

function errorId(inputId: string) {
  return `${inputId}-error`;
}

function helperId(inputId: string) {
  return `${inputId}-helper`;
}

type InputBase = {
  label?: string;
  error?: string;
  helperText?: string;
};

type InputProps = InputBase &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaProps = InputBase &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type SelectProps = InputBase &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string; disabled?: boolean }[];
    placeholder?: string;
  };

type FieldProps = InputProps | TextareaProps | SelectProps;

const inputBaseClasses =
  "w-full h-full rounded-ticket border border-input bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground";
const errorClasses = "mt-1.5 text-sm text-destructive";
const helperClasses = "mt-1.5 text-sm text-muted-foreground";

function InputField({
  id,
  label,
  error,
  helperText,
  className = "",
  ...rest
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full flex flex-col gap-0">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${inputBaseClasses} ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          [
            error ? errorId(inputId!) : null,
            helperText ? helperId(inputId!) : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      />
      {error && (
        <p id={errorId(inputId!)} className={errorClasses} role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId(inputId!)} className={helperClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  id,
  label,
  error,
  helperText,
  className = "",
  ...rest
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-0">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`${inputBaseClasses} min-h-20 resize-y ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          [
            error ? errorId(inputId!) : null,
            helperText ? helperId(inputId!) : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      />
      {error && (
        <p id={errorId(inputId!)} className={errorClasses} role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId(inputId!)} className={helperClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  error,
  helperText,
  options,
  placeholder,
  className = "",
  ...rest
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-0">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={`${inputBaseClasses} ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          [
            error ? errorId(inputId!) : null,
            helperText ? helperId(inputId!) : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId(inputId!)} className={errorClasses} role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId(inputId!)} className={helperClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
}

function Field(props: FieldProps) {
  switch (props.as) {
    case "textarea":
      return <TextareaField {...props} />;
    case "select":
      return <SelectField {...props} />;
    default:
      return <InputField {...props} />;
  }
}

export {
  Field,
  type InputProps,
  type TextareaProps,
  type SelectProps,
  type FieldProps,
};
