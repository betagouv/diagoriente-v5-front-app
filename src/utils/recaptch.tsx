import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

export default function App() {
  const [human, setIsHuman] = useState(false);
  const [humanKey, setHumanKey] = useState('');

 /*  const backendVerification = async () => {
    const RECAPTCHA_SERVER_KEY = '6LeF2eAZAAAAACV2S5IBFxnyaLXfFJKOJa1-LDWe';
    const isHuman = await axios(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`,
    })
      .then((res) => res.json())
      .then((json) => json.success)
      .catch((err) => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`);
      });

    if (humanKey === null || !isHuman) {
      throw new Error(`YOU ARE NOT A HUMAN.`);
    }
  }; */
  const verifyCaptcha = (res: any) => {
    console.log('res', res);
    if (res) {
      setIsHuman(true);
      setHumanKey(res);
    }
  };
  const expireCaptcha = () => {
    setIsHuman(false);
    setHumanKey('');
  };
  return (
    <ReCAPTCHA sitekey="6LeF2eAZAAAAACV2S5IBFxnyaLXfFJKOJa1-LDWe" onChange={verifyCaptcha} onExpired={expireCaptcha} />
  );
}
