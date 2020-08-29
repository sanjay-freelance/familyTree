import React, {useState, useEffect, useRef} from 'react';
import {getOrdinalScaleGetter} from 'd3Helper';
import {getScale} from "./helper";
import {getTilesForChildren} from "./hardcodedLayout";

import Tile from './Tile';

import './style.css';
import BreadCrumbs from "components/breadcrumbs";

export default function SquareTreemap(props){
	const {data, factor = 100} = props;

	const rootData = useRef(data);
	const [root, setRoot] = useState(data);
	const [path, setPath] = useState([]);
	const [zoombale, setZoomable] = useState(true);

	const colorScaleRef = useRef(getOrdinalScaleGetter());
	const scaleRef = useRef(getScale(factor)); // 3 / 4 ratio multiplied by factor 100 = width 300, height = 400

	const {tiles, rows, cols} = getTilesForChildren(root.children);

	/* handlers */
	function setSelectedDataAsRoot(data)  {
		if(data.children.length == 10 || data.children.length == 9) {
			setRoot(data);
			if(rootData.current !== data){
				setPath([
					rootData.current,
					data
				]);
				setZoomable(false);
			} else {
				setPath([]);
				setZoomable(true);
			}

		}
		else {
			alert(`We need to prepare hard code layout for this count (${data.children.length})`);
		}
	};

	/* UI rendering */
	let tilesUI;
	const scale = scaleRef.current;
	if (tiles && tiles.length > 0) {
		tilesUI = tiles.map((tile, index)=>{
			const {layout, data} = tile;
			const {x, y, unit} = layout;
			return <Tile key={index}
									 onClick={zoombale ? ()=> {setSelectedDataAsRoot(data)} : null}
									 data={data}
									 x={x} y={y} unit={unit}
									 scale={scale} colorScale={colorScaleRef.current}/>
		});
	}

	// units are converted pixel values
	const width = scale(rows);
	const height = scale(cols);


	const relativeContainerStyle = {
		position: 'relative',
		width: width,
		height: height
	};

	const absoluteContainerStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: width,
		height: height
	};

	return (
	<div className='tree-map'>
		{!zoombale ?  <BreadCrumbs path={path} onItemClick={setSelectedDataAsRoot}/> : null}
		<div style={relativeContainerStyle}>
			<div style={absoluteContainerStyle}>
				{tilesUI}
			</div>
		</div>
	</div>
	)
}
















