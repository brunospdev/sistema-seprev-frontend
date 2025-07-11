import React from 'react';
import LogoSvg from '../assets/logo-previ.svg';

export default function LogoPrevi() {
  return (
    <div className="logo-previ">
      <img src={LogoSvg} alt="Sergipe Previdência" className="logo-previ-img" />
    </div>
  );
}
