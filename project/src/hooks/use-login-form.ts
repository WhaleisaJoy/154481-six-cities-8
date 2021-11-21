import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../types/auth-data';

type OnSubmitType = (authData: AuthData) => void;

type ResultLoginForm = [
  {
    email: string,
    password: string,
  },
  ({target}: ChangeEvent<HTMLInputElement>) => void,
  (evt: FormEvent<HTMLFormElement>) => void,
];

export const useLoginForm = (onSubmit: OnSubmitType): ResultLoginForm => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleFieldChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (form.email !== '' && form.password !== '') {
      onSubmit({
        login: form.email,
        password: form.password,
      });
    }
  };

  return [form, handleFieldChange, handleSubmit];
};
