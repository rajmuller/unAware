import React, { FC } from "react";
import { FieldAttributes, useField } from "formik";

type FieldProps = { label: string; name?: string } & FieldAttributes<{}>;
type CheckBoxProps = { name?: string };

export const TextInput: FC<FieldProps> = ({ label, ...props }) => {
  // useField() returns [formik.ge), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<{}>(props as any);
  const { id, name } = props as any;
  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      <input {...field} {...(props as any)} />
    </>
  );
};

export const CheckBox: FC<CheckBoxProps> = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  // @ts-ignore
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export const Select: FC<FieldProps> = ({ label, ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id, name } = props as any;
  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <select {...field} {...(props as any)} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
