import React from 'react';
import { useField } from 'effector-forms';
import { InputField } from 'ui';
import { model } from '../model';

export const EmailField: React.FC = () => {
  const { name, onChange } = useField(model.form.fields.email);

  return (
    <InputField
      className="form-control-lg"
      name={name}
      placeholder="Email"
      type="email"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};