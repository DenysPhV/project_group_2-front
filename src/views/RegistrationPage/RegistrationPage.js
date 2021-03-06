import React from 'react';
import Media from 'react-media';

import { useWindowSize } from '@react-hook/window-size';

import RegistrationForm from '../../components/RegistrationForm';

// import LoginLogo from '../../images/Frame-tblet-reg.png';
import LoginLogo2x from '../../images/Frame-desctop@2x.png';

import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  const [width] = useWindowSize();

  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.overflow}`}>
        <div className={styles.mainWrapper}>
          <Media query="(min-width: 768px)">
            <div className={styles.logoWrapper}>
              {width >= 768 && (
                <img
                  src={LoginLogo2x}
                  alt="finance app logo"
                  className={styles.logo}
                />
              )}
              {width >= 768 && <p className={styles.text}>Finance App</p>}
            </div>
          </Media>

          <div className={styles.formWrapper}>
            <RegistrationForm />
            <div className={styles.blur}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
