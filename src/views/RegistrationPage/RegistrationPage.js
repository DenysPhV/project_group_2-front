import React from 'react';
import { useWindowSize } from '@react-hook/window-size';

import RegistrationForm from '../../components/RegistrationForm';

import s from './RegistrationPage.module.scss';
// import s from '../LoginPage/LoginPage.module.scss'
const RegistrationPage = () => {
  const [width] = useWindowSize();

  return (
    <div>
      <div className={s.pageContainer}>
        {width >= 768 && <p className={s.text}>Finance App</p>}
        {/* <p className={style.pageText}>Finance App</p> */}
        <div className={s.wrap}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
