import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IdosoList from '../components/IdosoList';
import {AiFillPlusCircle} from 'react-icons/ai';

import '../global/pages/list.css';
import api from '../services/api';

export interface OldmanTypes {
  id: string;
  name: string;
  gender: string;
  age: Number;
  avatar: string;
}

export default function List () {
  const [oldmanList, setOldmanList] = useState<Array<OldmanTypes>>();

  useEffect(() => {
    api.get('/oldman/show').then(response => {
      setOldmanList(response.data);
    }).catch(err => {
      alert('problemas ao carregar o conteudo');
    })
  },[])

  return (
    <div className="list-container">
      <input type="text" className="busca" placeholder='pesquisa'/>
      <main>
        {
          oldmanList
            ?
          oldmanList.map(oldman => (
            <IdosoList opnions={oldman} key={String(oldman.id)} />
          ))
            :
          (
            <div className="loading">
              loading...
            </div>
          )
        }
      </main>
      <Link to="/create" className="redirect-create-new-oldman">
        <AiFillPlusCircle size={38} />
      </Link>
    </div>
  );
}