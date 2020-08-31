import React, {useState} from 'react';
import TreeMap from 'components/treemap';
import useRequest from 'hooks/useRequest';
import CheckBox from 'ui/checkBox';
import DropDown from 'ui/dropDown';

import './app.css';
import {data} from './data';
import {iteratorMetadata} from './attributeMetaData';

let id = 0;
function addIdToData(originalData, addRoot = false){
	let data = addRoot ? {
		name: 'Categories',
		count: 1,
		children: originalData
	} :originalData;

	data.dataId = id;
	id = id + 1;
	if(data.children){
		data.children.map((data)=>{
			addIdToData(data);
		})
	}
	return data
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
			<Header/>
			<h2>Family Tree</h2>
			{treeMapUI}
		</div>
	)
}


function FamilyTree(props){
	let {data} = props;
	/*
	* Hack: If server Data Dont have Id,
	* we need to manually add Id so that UI Change when tree is rendered at sublevel, state will be maintained
	* */
	data = addIdToData(data, true);
	const [valueAttribute, setValueAttribute] = useState('count');
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

	function imageGetter(data){
		// fetch url property from data and return them
		return `https://cdn.givingcompass.org/wp-content/uploads/2020/03/25153430/shutterstock_654681745-400x225.jpg`
	}

	return (
	<div>
		<div className='family-tree-controls'>
			<DropDown options={attributes}
								defaultValue='count'
								onChange={attributeChangeHandler}>
				Weight
			</DropDown>

			<CheckBox defaultValue={false}
								onChange={expandChangeHandler}>
				Expand Tree
			</CheckBox>
		</div>

		<div className='family-tree'>
			<TreeMap data={data}
							 width={680} height={400}
							 imageGetter={imageGetter}
							 valueAttribute={valueAttribute}
							 iterator={iteratorMetadata[valueAttribute]}
							 expandTree={expandTree}/>
		</div>


	</div>
	)
}


function Header(props){
	return (
		<div className='header'>
			<div className='logo-control-container'>
				<div className='logo'>Louise</div>
				<div className='controls'>
					<div className='gift-box'>IC</div>
					<div className='user'>user</div>
				</div>
			</div>
			<div className='nav-container'>
				<ul className='nav'>
					<li>Give</li>
					<li>Family</li>
					<li>Share</li>
				</ul>
			</div>
		</div>
	)
}




