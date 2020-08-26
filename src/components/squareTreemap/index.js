import React, {useState, useEffect, useRef} from 'react';
import {getOrdinalScaleGetter} from 'd3Helper';
import {computeAndGetTilesFromData, getScale} from "./helper";

import Tile from './Tile';

import './style.css';

export default function SquareTreemap(props){
	const {data, valueAttribute = 'age', hidePath = false , rows, cols, factor = 100} = props;

	// todo: Needed for drill down logic
	const [rootTile, setRootTile] = useState(null);

	const colorScaleRef = useRef(getOrdinalScaleGetter());
	// todo: height and weight need to be determined by number of children and their values
	const scaleRef = useRef(getScale(factor)); // 3 / 4 ratio multiplied by factor 100 = width 300, height = 400

	// todo: Needed for drill down logic
	const selectedNodeRef = useRef(null);
	const rootNodeRef = useRef(null);

	// todo: Needed for drill down logic
	useEffect(()=>{

	},[rows, cols, valueAttribute]);

	const tiles = computeAndGetTilesFromData(data,rows,cols);

	/* handlers */
	function setSelectedNodeAsRootNode(nodeWithTreeAndLayoutValues)  {

	};

	/* UI rendering */
	let tilesUI;
	const scale = scaleRef.current;
	if (tiles && tiles.length > 0) {
		tilesUI = tiles.map((tile, index)=>{
			const {x, y, unit, data} = tile;
			return <Tile key={index}
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
		<div style={relativeContainerStyle}>
			<div style={absoluteContainerStyle}>
				{tilesUI}
			</div>
		</div>
	</div>
	)
}
















