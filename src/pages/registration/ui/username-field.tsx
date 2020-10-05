import React from 'react';
import { useField } from 'effector-forms';
import { InputField } from '../../../ui';
import { model } from '../model';

export const UsernameField: React.FC = () => {
  const { name, onChange } = useField(model.form.fields.username);

  return (
    <InputField
      className="form-control-lg"
      name={name}
      placeholder="Username"
      type="email"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
