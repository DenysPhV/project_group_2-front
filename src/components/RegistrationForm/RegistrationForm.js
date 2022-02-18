import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import ButtonRegister from '../ButtonRegister/ButtonRegister.js';

import styles from './RegistrationForm.module.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as IconWallet } from '../../icons/IconWallet.svg';
import { ReactComponent as IconEmail } from '../../icons/IconEmail.svg';
import { ReactComponent as IconPass } from '../../icons/IconPass.svg';
import { ReactComponent as IconName } from '../../icons/IconName.svg';
import { register } from '../../redux/auth/auth-operations.js'
import RegistrationPrgressBar from './RegistrationProressBar.js';
import { useState } from "react";
export default function RegistrationForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [password, setPassword] = useState("");
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

    const handleRegister = ({ name, email, password }) => {

        dispatch(register({ name, email, password }));
        history.push("/login");
    };

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
                    <Form className={styles.formRegister}>
                        <div className={styles.logoContainer}>
                            <IconWallet className={styles.logoIogoIcon} />
                            <h1 className={styles.logo}>Wallet</h1>
                        </div>

                        <label htmlFor={`email`} className={styles.label}>
                            <IconEmail />
                            <input
                                type="email"
                                email="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="E-mail"
                                value={values.email}
                                id="email"
                                className={styles.input}
                            />
                        </label>

                        {touched.email && errors.email && (
                            <p className={styles.errors}>{errors.email}</p>
                        )}

                        <label htmlFor={`password`} className={styles.label}>
                            <IconPass />

                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=" Пароль"
                                value={values.password}
                                className={styles.input}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        {touched.password && errors.password && (
                            <p className={styles.errors}>{errors.password}</p>
                        )}

                        <label htmlFor={`confirmPassword`} className={styles.label}>
                            <IconPass />
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder=" Подтвердите пароль"
                                className={styles.input}
                            />

                        </label>
                        <RegistrationPrgressBar password={password} />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className={styles.errors}>{errors.confirmPassword}</p>
                        )}

                        <label htmlFor={`name`} className={styles.label}>
                            <IconName />
                            <input
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Ваше имя"
                                className={styles.input}
                            />
                        </label>
                        {touched.name && errors.name && (
                            <p className={styles.errors}>{errors.name}</p>
                        )}
                        <div className={styles.btnContainer}>
                            <ButtonRegister
                                className={styles.logoBtn}
                                onClick={handleSubmit}
                                disabled={!isValid && !dirty}
                                disable="sd"
                                type="submit"
                                text="Регистрация"
                            />

                            <NavLink to="/login" className={styles.mainBtn}>
                                Вход
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
