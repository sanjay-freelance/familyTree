import React from "react";

export default function TreeNode(props){
	const { node, xScale, yScale, colorScale, onNodeClick} = props;

	const {customId, children, x0, y0, x1, y1, data} = node;
	const {name} = data;

	// 1. Dimensions
	const xPos = xScale(x0);
	const yPos = yScale(y0);
	const nodeWidth = (xScale(x1) - xPos);
	const nodeHeight = (yScale(y1) - yPos);
	const pos = `translate(${xPos},${yPos})`;

	// 2. Background color values
	const colorValue = colorScale(name);

	// 3. Leaf Specific Values
	const isLeaf = children && children.length > 0 ? false : true;
	const cursorStyle = isLeaf ? {cursor :"auto"}: {cursor :"pointer"} ;
	const clickHandler = isLeaf ? null : ()=>onNodeClick(node);

	return (
	<g id={customId} transform={pos} className="node " style={cursorStyle} onClick={clickHandler} >
		<rect id={`rect-${customId}`} width={nodeWidth} height={nodeHeight} fill={colorValue}/>
		<text clipPath='hi'>
			<tspan dx={4} dy={14} fill='white'>{name}</tspan>
		</text>
	</g>
	);
}