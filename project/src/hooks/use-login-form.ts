import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../types/auth-data';

type OnSubmitType = (authData: AuthData) => void;

type FieldType = {
  value: string;
  isValid: boolean;
  errorMessage: string;
  regExp: RegExp;
};

type FormType = {
  [key: string]: FieldType;
};

type ResultLoginForm = [
  FormType,
  ({target}: ChangeEvent<HTMLInputElement>) => void,
  (evt: FormEvent<HTMLFormElement>) => void,
];

export const useLoginForm = (onSubmit: OnSubmitType): ResultLoginForm => {
  const [form, setForm] = useState<FormType>({
    email: {
      value: '',
      isValid: false,
      errorMessage: 'Please enter a valid email address',
      regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      value: '',
      isValid: false,
      errorMessage: 'Password must contain at least 1 letter and 1 number',
      regExp: /^(?=.*\d)(?=.*\D)[A-Za-z0-9]{2,}$/,
    },
  });

  const handleFieldChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const checkValidity = Boolean(target.value.match(form[target.name].regExp));

    if (!checkValidity) {
      target.setCustomValidity(form[target.name].errorMessage);
    } else {
      target.setCustomValidity('');
    }

    setForm({
      ...form,
      [target.name]: {
        ...form[target.name],
        value: target.value,
        isValid: checkValidity,
      },
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (form.email.value !== '' && form.password.value !== '') {
      onSubmit({
        login: form.email.value,
        password: form.password.value,
      });
    }
  };

  return [form, handleFieldChange, handleSubmit];
};
