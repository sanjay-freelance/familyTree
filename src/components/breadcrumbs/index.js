import React from "react";
import {getAncestorsPathFor} from "d3Helper";
import './style.css';

export default function BreadCrumbs(props){
	const {node, path, onItemClick} = props;

	const breadCrumbItems = path ? path : getAncestorsPathFor(node);
	if(!breadCrumbItems){
		return null;
	}

	const lastIndex = breadCrumbItems.length - 1;
	const breadsCrumbUI =  breadCrumbItems.map((item, index)=>{
		const {name} = item;

		const itemUI = (index == lastIndex) ? name : (
			<span>
				<a>{name}</a>
				<span>&nbsp;</span>
				<span>&#62;</span>
			</span>
		);

		return (
		<li key={index} onClick={()=>{onItemClick(item)}}>
			{itemUI}
		</li>
		)
	});

	return (
	<ul className='breadcrumb'>
		{breadsCrumbUI}
	</ul>
	)

}