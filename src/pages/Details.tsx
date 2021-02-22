import React, { useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import '../global/pages/details.css';
import api from '../services/api';

interface Parms {
	id: String
}
interface OldmanDetails {
	id: String;
  name: String;
  age: Number;
  gender: String;
  avatar: String;
  isDisease: Boolean;
  disease: Array<String | null>;
  medicine: [{
		medicineTimes: Array<String | null>;
		medicineQuant: Array<String | null>;
		name: Array<String | null>;
	}];
  
}

export default function Details(props: RouteChildrenProps) {
	const {id} = props.match?.params as Parms;
	const [oldman, setOldman] = useState<OldmanDetails>();

	useEffect(() => {
		api.get(`oldman/${id}`).then(response => {
			if (!response.data){
				alert('Idoso nao encontrado')
				return
			}
			setOldman(response.data);
		}).catch(() => {
			alert('Problemas ao buscar os dados.');
		});
	})

	return (
		oldman?
		(
			<div className="details">
				<div className="header">
					<img src={`https://ldi-api.herokuapp.com/public/${oldman.avatar}`} alt=""/>
					<div className="title-description">
						<h1 className="name">{oldman.name}</h1>
						<p className="age">{oldman.age} anos</p>
					</div>
				</div>
				<div className="main">
						<div className="block disease">
							<h1>Doença</h1>
							<ul>
								{
									oldman.isDisease? 
										oldman.disease.map((disease, index) => {
											return <li key={index}>{disease}</li>
										})
									:
									<div/>
								}
							</ul>
						</div>
						<div className="block medicine">
							<h1>Remedios</h1>
							<ul>
								{
									oldman.isDisease?
										oldman.medicine.map((medicine, index) => {
											return <li key={index}>{medicine.name}</li>
										})
									:
									<div/>
								}
							</ul>
						</div>
						<div className="block medication-schedule">
							<h1>Horario das medicações</h1>
							<table>
								<tr>
									<th>Remedio</th>
									<th>Dose</th>
									<th>Horario</th>
								</tr>
								{
									oldman.isDisease?
										oldman.medicine.map((medicine, index) => {
											return (
												<tr key={index}>
													<td>{medicine.name}</td>
													<td>{medicine.medicineQuant}</td>
													<td>{medicine.medicineTimes}</td>
												</tr>
											)
										})
									:
									<div/>
								}
							</table>
						</div>
					</div>
			</div>	
		):

		<div className="loading">
			<p>loading...</p>
		</div>
	);
}