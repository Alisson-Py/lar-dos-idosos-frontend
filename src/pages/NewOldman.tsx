import React, { ChangeEvent, FormEvent, useState } from 'react';
import {AiFillCloseCircle, AiFillPlusCircle} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';

import '../global/pages/new-oldman.css';
import api from '../services/api';

export default function NewOldman() {
  const {goBack} = useHistory();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [isDisease, setIsDisease] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File>();
  const [disease, setDisease] = useState<string[]>(['']);
  const [medicineName, setMedicineName] = useState<string[]>(['']);
  const [medicineQuant, setMedicineQuant] = useState<string[]>(['']);
  const [medicineTimes, setMedicineTimes] = useState<string[]>(['']);


  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    const data = new FormData();

    
    if (avatar) data.append('image', avatar);
    if (name) data.append('name', name); 
    if (age) data.append('age', age.toString());
    if (gender) data.append('gender', gender);
    data.append('isDisease', isDisease? 'true': 'false')
    if (isDisease) {
      if (disease !== ['']) data.append('disease', JSON.stringify(disease));
      if (medicineName !== ['']) data.append('medicine', JSON.stringify(medicineName));
      if (medicineQuant !== ['']) data.append('medicineQuant', JSON.stringify(medicineQuant));
      if (medicineTimes !== ['']) data.append('medicineTimes', JSON.stringify(medicineTimes));
    }

    api.post(
      'create',
      data
    ).then(res => {
      alert('success')
      goBack();
    }).catch(err => {
      console.log(err);
      alert('err')
    })
  }


  function handleAddNewLayer(divModify: String): void {
    if (divModify === 'disease') {
      setDisease([...disease, ''])
    } else {
      setMedicineName([...medicineName, ''])
      setMedicineQuant([...medicineQuant, ''])
      setMedicineTimes([...medicineTimes, ''])
    }
  }

  const handleSelectAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedAvatar = Array.from(event.target.files);

    setAvatar(selectedAvatar[0]);
  }
  return (
    <div className="new-oldman">
      <h1 className="title">Novo Cadastro</h1>
      <div className="form">
        <div className="input-block">
          <p className="title">Foto</p>
          <input
            type="file"
            className="file-input"
            onChange={handleSelectAvatar}
          />
        </div>
        <hr/>
        <div className="input-block">
          <p className="title">Nome</p>
          <input
            type="text"
            className="text-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <p className="title">Idade</p>
          <input
            type="number"
            className="text-input"
            value={age}
            onChange={e => setAge(Number(e.target.value))}
          />
        </div>
        <div className="input-block">
          <p className="title">Genêro</p>
          <select value={gender} onChange={e => setGender(String(e.target.value))}>
            <option value="">Selecione uma opção</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
        </div>
        <hr/>
        <div className="input-block">
          <p className="title">Possui alguma doença?</p>
          <div className="is-disease-block">
            <label htmlFor="is-disease">Sim</label>
            <input
              type="checkbox"
              id="is-disease"
              className="checkbox-input"
              value={0}
              checked={isDisease}
              onChange={() => {setIsDisease(!isDisease)}}  
            />
          </div>
        </div>
        <div className={`input-block ${isDisease? '': 'disable'}`}>
          <p className="title">Doença(s)</p>
          <div className="disease-block">
            {disease.map((diseaseItem, index) => {
              return (
                <div className="input-disease-block" key={index}>
                  <input
                    type="text"
                    className="text-input"
                    value={disease[index]}
                    onChange={e => {
                      var diseaseChange = disease;
                      var {value} = e.target;
                      diseaseChange[index] = value.toString()
                      setDisease([...diseaseChange]);
                    }}
                  />
                  <button>
                    <AiFillCloseCircle size={30} />
                  </button>
                </div>
              )
            })}
          </div>
          <button onClick={() => {handleAddNewLayer('disease')}}>
            <AiFillPlusCircle size={30} />
          </button>
        </div>
        <div className={`input-block ${isDisease? '': 'disable'}`}>
          <p className="title">Remédio(s)</p>
          <div className="medicine-titles-block">
            <span className="title-1">Nome</span>
            <span className="title-2">Quantidade</span>
            <span className="title-3">Período</span>
          </div>
          {medicineName.map((medicineItem, index) => {
            return (
              <div className="medicine-input-block" key={index}>
                <input
                  type="text"
                  className="text-input"
                  value={medicineName[index]}
                  onChange={e => {
                    var medicineNameChange = medicineName;
                    var {value} = e.target;
                    medicineNameChange[index] = value.toString()
                    setMedicineName([...medicineNameChange]);
                  }}
                />
                <input
                  type="text"
                  className="text-input"
                  value={medicineQuant[index]}
                  onChange={e => {
                    var medicineQuantChange = medicineQuant;
                    var {value} = e.target;
                    medicineQuantChange[index] = value.toString()
                    setMedicineQuant([...medicineQuantChange]);
                  }}
                />
                <input
                  type="text"
                  className="text-input"
                  value={medicineTimes[index]}
                  onChange={e => {
                    var medicineTimesChange = medicineTimes;
                    var {value} = e.target;
                    medicineTimesChange[index] = value.toString()
                    setMedicineTimes([...medicineTimesChange]);
                  }}
                />
                <button>
                  <AiFillCloseCircle size={30} />
                </button>
              </div>
            )
          })}
          <button onClick={() => {handleAddNewLayer('medicine')}}>
            <AiFillPlusCircle size={30} />
          </button>
        </div>
        <button onClick={handleSubmitForm} className="submit-btn" >Cadastrar novo idoso</button>
      </div>
    </div>
  );
}