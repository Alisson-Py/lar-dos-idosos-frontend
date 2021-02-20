import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import '../global/components/idoso-list.css';
import { OldmanTypes } from '../pages/List';

interface IdosoListTypes {
  opnions: OldmanTypes
}

const IdosoList:FC<IdosoListTypes> = ({opnions}) => {
  return (
    <Link to={`details/${opnions.id}`} className="idoso">
      <img src={String(opnions.avatar)} alt="" className="idoso-image"/>
      <p className="idoso-nome">{opnions.name}</p>
      <p className="idoso-idade">{opnions.age} anos</p>
    </Link>
  );
}

export default IdosoList;