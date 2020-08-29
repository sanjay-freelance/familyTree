import React, {useState} from 'react';
import SquareTreemap from 'components/squareTreemap';
import useRequest from 'hooks/useRequest';

import './app.css';
import {data as givingData} from './mockData/categoriesMock';

let id = 0;
function addIdToData(data){
	data.dataId = id;
	id = id + 1;
	if(data.children){
		data.children.map((data)=>{
			addIdToData(data);
		})
	}
}

export default function App(props){
	const { response, loading, error } = useRequest({
		url: 'https://randomfamily.herokuapp.com/getFamily.json',
		method: 'GET'
	});

	let treeMapUI;
	if(loading){
		treeMapUI = 'Loading .... ';
	} else if(error){
		treeMapUI = <FundsTree data={givingData}/>;
		console.log(error.message);
		console.log('Due to Error Message loading Local Data');
	} else if(response){
		treeMapUI = <FundsTree data={response}/>;
	}

	return (
		<div className='app'>
			<h2>Funds Tree</h2>
			{treeMapUI}
		</div>
	)
}


function FundsTree(props){
	const {data} = props;


	const categoryData = {
		name: 'Category',
		children: data,
		id: 0
	}

	return (
	<div>
		<div className='family-tree'>
			<SquareTreemap data={categoryData} factor={100}/>
		</div>
	</div>
	)
}




