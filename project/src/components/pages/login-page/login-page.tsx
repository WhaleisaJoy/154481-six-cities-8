import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../../../hooks/use-login-form';
import { loginAction } from '../../../store/api-action';
import { AuthData } from '../../../types/auth-data';
import PageHeader from '../../page-header/page-header';

function Login(): JSX.Element {
  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const [form, handleFieldChange, handleSubmit] = useLoginForm(onSubmit);

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
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={form.email.value}
                  placeholder="Email"
                  required
                  onChange={handleFieldChange}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
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
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
