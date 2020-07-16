import React, { FC } from "react";
import { FieldAttributes, useField } from "formik";
import styled from "styled-components";

type FieldProps = { label: string } & FieldAttributes<{}>;

export const TextInput: FC<FieldProps> = ({ label, ...props }) => {
  // useField() returns [formik.ge), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<{}>(props as any);
  const { id, name } = props as any;
  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <input {...field} {...(props as any)} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export const CheckBox: FC = ({ children, ...props }) => {
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

const StyledSelect = styled.select`
  //asd
`;

const StyledErrorMessage = styled.div`
  //asd
`;

const StyledLabel = styled.label`
  //asd
`;

export const Select: FC<FieldProps> = ({ label, ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id, name } = props as any;
  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <StyledSelect {...field} {...(props as any)} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};
