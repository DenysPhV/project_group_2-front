import React from "react";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";
import './RegistrationPage.scss'
const RegistrationPage = () => {

    return (
        <div>
            <div className="page_container">
                <p className="page_text">Finance App</p>
                <RegistrationForm />

            </div>

        </div>

    )
}

export default RegistrationPage