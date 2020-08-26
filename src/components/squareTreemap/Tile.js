import React from "react";
import './style.css';

export default function SquareTile(props){
	const { x, y, unit, data, colorScale, scale} = props;
	//const {name} = data;

	const colorValue = colorScale(x);

	const squareSize = scale(unit);

	const tileStyle = {
		position: 'absolute',
		display: 'flex',
		left: scale(x),
		top: scale(y),
		width: squareSize,
		height: squareSize,
	};

	const contentContainerStyle = {
		backgroundColor: colorValue
	};

	const contentStyle = {
		color: 'white',
		padding: '4px'
	};

	return (
	<div style={tileStyle}>
		<div className='tile' style={contentContainerStyle}>
			<div style={contentStyle}>
				<label>hi</label>
			</div>
		</div>
	</div>
	);
}
