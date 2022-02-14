import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import ButtonRegister from '../ButtonRegister/ButtonRegister.js';
import './RegistrationForm.scss';
import s from '../../pages/Header/Header.module.scss';
import { ReactComponent as IconWallet } from '../../icons/IconWallet.svg';
import { ReactComponent as IconEmail } from '../../icons/IconEmail.svg';
import { ReactComponent as IconPass } from '../../icons/IconPass.svg';
import { ReactComponent as IconName } from '../../icons/IconName.svg';

export default function RegistrationForm() {
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
            .max(14, 'Пароль должен состоять максимум из 14 символов')
            .typeError('Должно быть строкой')
            .required('Обязательно'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
            .required('Обязательно'),
        email: yup.string().email('Введите верный email').required('Обязательно'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                }}
                validateOnBlur
                onSubmit={(values) => {
                    console.log(values);
                }}
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
                    <Form className="form-register ">
                        <div className="logo-container">
                            <IconWallet className={s.logoIcon} />
                            <h1 className={s.logo}>Wallet</h1>
                        </div>

                        <label htmlFor={`email`} className="label">
                            <IconEmail />
                            <input
                                type="email"
                                email="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="E-mail"
                                value={values.email}
                                id="email"
                                className="input"
                            />
                        </label>

                        {touched.email && errors.email && (
                            <p className="errors">{errors.email}</p>
                        )}

                        <label htmlFor={`password`} className="label">
                            <IconPass />

                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=" Пароль"
                                value={values.password}
                                className="input"
                            />
                        </label>

                        {touched.password && errors.password && (
                            <p className="errors">{errors.password}</p>
                        )}

                        <label htmlFor={`confirmPassword`} className="label">
                            <IconPass />
                            <input
                                type="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder=" Подтвердите пароль"
                                className="input"
                            />
                        </label>

                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className="errors">{errors.confirmPassword}</p>
                        )}

                        <label htmlFor={`name`} className="label">
                            <IconName />
                            <input
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Ваше имя"
                                className="input"
                            />
                        </label>
                        {touched.name && errors.name && (
                            <p className="errors">{errors.name}</p>
                        )}
                        <div className="btn-container">
                            <ButtonRegister
                                className="logo_btn"
                                onClick={handleSubmit}
                                disabled={!isValid && !dirty}
                                disable="sd"
                                type="submit"
                                text="Регистрация"
                            />

                            <NavLink to="/login" className="main_btn">
                                Вход
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
