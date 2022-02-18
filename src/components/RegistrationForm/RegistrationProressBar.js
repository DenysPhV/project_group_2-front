import React from "react";
import zxcvbn from "zxcvbn";

import styles from "./RegistrationForm.module.scss";

const RegistrationProressBar = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = (testResult.score * 100) / 4;
    const progressColor = () => {

        if (testResult.score === 0) {
            return "#f37ca2"
        } else if (testResult.score === 1) {
            return "#FF6596"
        } else if (testResult.score === 2) {
            return "#FF6596"
        } else if (testResult.score === 3) {
            return "#24CCA7"
        } else if (testResult.score === 4) {
            return "#24CCA7"
        } else {
            return "none"
        }



    };

    const progressPasswordText = () => {

        if (testResult.score === 0) {
            return ""
        } else if (testResult.score === 1) {
            return "Слабый пароль"
        } else if (testResult.score === 2) {
            return "Ожыдаемый пароль"
        } else if (testResult.score === 3) {
            return "Хороший пароль"
        } else if (testResult.score === 4) {
            return "Сильный пароль"
        } else {
            return "none"
        }



    };

    const changeProgressStyle = () => ({

        height: "4px",
        marginTop: "-20px",

    });

    const changePasswordColor = () => ({

        width: `${num}%`,
        height: "4px",
        background: progressColor(),
        boxShadow: "0px 1px 8px rgba(36, 204, 167, 0.5)",

    });

    return (
        <>
            <div className={styles.progress} style={changeProgressStyle()}>
                <div className={styles.progressBar} style={changePasswordColor()}></div>
            </div>
            <p className={styles.textPr} style={{ color: progressColor() }}>
                {progressPasswordText()}
            </p>
        </>
    );
};

export default RegistrationProressBar;
