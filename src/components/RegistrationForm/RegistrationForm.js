import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonRegister from '../ButtonRegister/ButtonRegister.js';

import styles from './RegistrationForm.module.scss';

// import { ReactComponent as IconWallet } from '../../icons/IconWallet.svg';
import { ReactComponent as IconEmail } from '../../icons/IconEmail.svg';
import { ReactComponent as IconPass } from '../../icons/IconPass.svg';
import { ReactComponent as IconName } from '../../icons/IconName.svg';

import { register } from '../../redux/auth/auth-operations.js';

import RegistrationPrgressBar from './RegistrationProressBar.js';
import s from '../../components/LoginForm/LoginForm.module.scss';

import logoMobile from '../../icons/logo-mobile.svg';
import logo from '../../icons/logo.svg';
export default function RegistrationForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .min(1, 'Имя должно состоять минимум из 1 символа')
      .max(12, 'Имя должно состоять максимум из 12 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),

    password: yup
      .string()
      .min(6, 'Пароль должен состоять минимум из 6 символов')
      .max(14, 'Пароль должен состоять максимум из 12 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
  });

  const handleRegister = ({ name, email, password }) => {
    dispatch(register({ name, email, password }));
    history.push('/login');
  };


  return (
    <>
      <div className={styles.formWrap}>
        <img src={logoMobile} alt="" className={s.logoMobile} />
        <img src={logo} alt="" className={s.logo} />
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
          }}
          validateOnBlur
          onSubmit={handleRegister}
          validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <form onSubmit={handleSubmit} className={s.form}>




              <div className={s.inputWrap}>
                <label htmlFor={`email`} className={styles.label}>
                  <IconEmail className={s.icon} />
                  <input
                    type="email"
                    email="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="E-mail"
                    value={values.email}
                    id="email"
                    className={s.input}
                  />
                </label>


                {touched.email && errors.email && (
                  <p className={s.errorMessage}>{errors.email}</p>
                )}
              </div>
              <div className={s.inputWrap}>
                <label htmlFor={`password`} className={styles.label}>
                  <IconPass className={s.icon} />

                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" Пароль"
                    value={values.password}
                    className={s.input}
                    onInput={(e) => setPassword(e.target.value)}
                  />
                </label>

                {touched.password && errors.password && (
                  <p className={s.errorMessage}>{errors.password}</p>
                )}
              </div>
              <div className={s.inputWrap}>
                <label htmlFor={`confirmPassword`} className={styles.label}>
                  <IconPass className={s.icon} />
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder=" Подтвердите пароль"
                    className={s.input}
                  />

                </label>
                <RegistrationPrgressBar password={password} />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className={s.errorMessage}>{errors.confirmPassword}</p>
                )}
              </div>
              <div className={s.inputWrap}>
                <label htmlFor={`name`} className={styles.label}>
                  <IconName className={s.icon} />
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Ваше имя"
                    className={s.input}
                  />
                </label>
                {touched.name && errors.name && (
                  <p className={s.errorMessage}>{errors.name}</p>
                )}
              </div>

              <ButtonRegister
                className={s.button}
                onClick={handleSubmit}
                disabled={!isValid && !dirty}
                disable="sd"
                type="submit"
                text="Регистрация"
              />



            </form>

          )}
        </Formik>

        <div className={s.link}>
          <NavLink to="/login" >
            Вход
          </NavLink>

        </div>
      </div>
    </>
  );
}
