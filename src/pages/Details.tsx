import React, { useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import '../global/pages/details.css';
import api from '../services/api';

interface OldmanDetails {
	id: string;
  name: string;
  age: Number;
  gender: string;
  avatar: string;
  isDisease: Boolean;
  disease: Array<string | null>;
  medicine: {
		name: [string | null];
		quant: [string | null];
		times: [string | null];
	};
  
}

export default function Details(props: RouteChildrenProps) {
	const {id} = props.match?.params as {id: string};
	const [oldman, setOldman] = useState<OldmanDetails>();

	useEffect(() => {
		api.get(`/oldman/details/${id}`).then(response => {
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
					<img src={oldman.avatar} alt=""/>
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
										oldman.medicine.name.map((name, index) => {
											return <li key={index}>{name}</li>
										})
									:
									<div/>
								}
							</ul>
						</div>
						<div className="block medication-schedule">
							<h1>Horario das medicações</h1>
							<table>
								<tbody>
									<tr>
										<th>Remedio</th>
										<th>Dose</th>
										<th>Horario</th>
									</tr>
									{
										oldman.isDisease?
											oldman.medicine.name.map((medicine, index) => {
												return (
													<tr key={index}>
														<td>{oldman.medicine.name[index]}</td>
														<td>{oldman.medicine.quant[index]}</td>
														<td>{oldman.medicine.times[index]}</td>
													</tr>
												)
											})
										:
										<div/>
									}
								</tbody>
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