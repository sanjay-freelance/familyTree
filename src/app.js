import React, {useState} from 'react';
import TreeMap from 'components/treemap';
import SquareTreemap from 'components/squareTreemap';
import useRequest from 'hooks/useRequest';
import CheckBox from 'ui/checkBox';
import DropDown from 'ui/dropDown';

import './app.css';
import {data} from './data';
import {sumIteratorMetadata} from './attributeMetaData';

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
		treeMapUI = <FamilyTree data={data}/>;
		console.log(error.message);
		console.log('Due to Error Message loading Local Data');
	} else if(response){
		treeMapUI = <FamilyTree data={response}/>;
	}

	return (
		<div className='app'>
			<h2>Family Tree</h2>
			{treeMapUI}
		</div>
	)
}


function FamilyTree(props){
	const {data} = props;
	/*
	* Hack: If server Data Dont have Id,
	* we need to manually add Id so that UI Change when tree is rendered at sublevel, state will be maintained
	* */
	addIdToData(data);
	const [valueAttribute, setValueAttribute] = useState('age');
	const [expandTree, setExpandTree] = useState(false);

	const attributes = Object.keys(data).filter((attribute)=>{
		return !isNaN(data[attribute])
	});

	function attributeChangeHandler(attribute){
		setValueAttribute(attribute);
	}

	function expandChangeHandler(checked){
		setExpandTree(checked);
	}

	return (
	<div>
		{/*<div className='family-tree-controls'>
			<DropDown options={attributes}
								defaultValue='age'
								onChange={attributeChangeHandler}>
				Weight
			</DropDown>
		</div>*/}

		<div className='family-tree'>
			<SquareTreemap data={data}
							 valueAttribute={valueAttribute}
							 sumIterator={sumIteratorMetadata[valueAttribute]}
							 hidePath={true} rows={4} cols={5}/>
		</div>


	</div>
	)
}




