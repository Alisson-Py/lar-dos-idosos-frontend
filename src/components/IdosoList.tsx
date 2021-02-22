import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {config} from 'dotenv';

import '../global/components/idoso-list.css';
import { OldmanTypes } from '../pages/List';

interface IdosoListTypes {
  opnions: OldmanTypes
}

config();


const IdosoList:FC<IdosoListTypes> = ({opnions}) => {
  return (
    <Link to={`details/${opnions.id}`} className="idoso">
      <img src={`https://ldi-api.herokuapp.com/public/${opnions.avatar}`} alt="" className="idoso-image"/>
      <p className="idoso-nome">{opnions.name}</p>
      <p className="idoso-idade">{opnions.age} anos</p>
    </Link>
  );
}

export default IdosoList;