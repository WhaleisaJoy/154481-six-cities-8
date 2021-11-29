import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../../store/api-action';
import { AuthData } from '../../../types/auth-data';
import PageHeader from '../../page-header/page-header';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getRandomInteger } from '../../../utils';
import { Cities } from '../../../database';
import { changeCity } from '../../../store/action';

type FieldType = {
  value: string;
  isValid: boolean;
  errorMessage: string;
  regExp: RegExp;
};

type FormType = {
  [key: string]: FieldType;
};

function Login(): JSX.Element {
  const dispatch = useDispatch();

  const cities = Object.values(Cities);
  const randomCity = cities[getRandomInteger(0, cities.length-1)];

  const onClickRandomCity = () => dispatch(changeCity(randomCity));

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

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

  return (
    <div className="page page--gray page--login">

      <PageHeader isNav={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  id="email"
                  value={form.email.value}
                  placeholder="Email"
                  required
                  onChange={handleFieldChange}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  value={form.password.value}
                  placeholder="Password"
                  required
                  onChange={handleFieldChange}
                />
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={form.email.value === '' || form.password.value === ''}
              >
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={onClickRandomCity}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
