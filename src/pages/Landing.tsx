import React from 'react';
import { Link } from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';

import '../global/pages/landing.css';
import landingImg from '../assets/landing-icon.svg';

export default function Landing() {
  return (
    <div className="landing">
      <h1 className="title">A vida é boa pra carai.</h1>
      <img src={landingImg} alt="Lading"/>
      <p>Programa de assistencia ao cuidador de idoso.</p>
      <Link to="login" className="link">
        <FiArrowRight size={28} color="#ffffff" />
      </Link>
    </div>
  );
}