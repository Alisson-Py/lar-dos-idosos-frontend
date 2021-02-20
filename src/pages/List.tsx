import React, { useEffect, useState } from 'react';
import IdosoList from '../components/idosoList';

import '../global/pages/list.css';
import api from '../services/api';

export interface OldmanTypes {
  id: String;
  name: String;
  gender: String;
  age: Number;
  avatar: String;
}

export default function List () {
  const [oldmanList, setOldmanList] = useState<Array<OldmanTypes>>();

  useEffect(() => {
    api.get('list').then(response => {
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
    </div>
  );
}