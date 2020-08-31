import React from "react";

export default function TreeNode(props){
	const { node, xScale, yScale, colorScale, opacityScale, onNodeClick, imageGetter} = props;

	const {customId, children, x0, y0, x1, y1, data, count, value} = node;
	const {name} = data;

	// 1. Dimensions
	const xPos = xScale(x0);
	const yPos = yScale(y0);
	const nodeWidth = (xScale(x1) - xPos);
	const nodeHeight = (yScale(y1) - yPos);
	const pos = `translate(${xPos},${yPos})`;

	// 2. Background color values
	const colorValue = colorScale(name);
	const opacityValue = opacityScale(value);
	console.log(value,opacityValue)

	// 3. Leaf Specific Values
	const isLeaf = children && children.length > 0 ? false : true;
	const clickHandler = isLeaf ? null : ()=>onNodeClick(node);

	let imageUI = null;
	if(imageGetter){
		const imageURL = imageGetter(data);
		const imageStyle = {
			position: 'absolute',
			display: 'flex',
			left: xPos,
			top: yPos,
			borderRadius: '6px',
			width: nodeWidth,
			height: nodeHeight,
			objectFit: 'cover',
			zIndex: 1
		};
		const overlayStyle =  {
			position: 'absolute',
			left: xPos,
			top: yPos,
			width: nodeWidth,
			height: nodeHeight,
			background: '#602a24',
			opacity:  opacityValue,
			cursor: 'pointer',
			zIndex: 2,
		};

		imageUI = [
			<div key='tile-overlay' className='node' onClick={clickHandler} style={overlayStyle}></div>,
			<img key='tile-image' className='node' style={imageStyle} src={imageURL} />
		]

	}

	const nodeStyle = {
		position: 'absolute',
		display: 'flex',
		left: xPos,
		top: yPos,
		borderRadius: '6px',
		width: nodeWidth,
		height: nodeHeight,
		cursor: isLeaf ? 'auto' : 'pointer'
	};

	const nodeContentStyle = {
		padding: '8px',
		display: 'flex',
		flex: '1'
	};

	const labelStyle = {
		color: 'white',
		alignSelf: 'flex-end'
	};



	return (
	<>
		<div style={nodeStyle} className='node' onClick={!imageUI ? clickHandler : null}>
			<div style={nodeContentStyle}>
				<label style={labelStyle}>{name}</label>
			</div>
		</div>
		{imageUI}
	</>
	);
}