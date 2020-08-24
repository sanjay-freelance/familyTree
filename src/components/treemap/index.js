import React, {useState, useEffect, useRef} from 'react';
import {computeTreeAttributesAndGetRoot, computeLayoutValues,
	getLinearScaleGetter, getOrdinalScaleGetter, getNode} from 'd3Helper';

import BreadCrumbs from 'components/BreadCrumbs';
import TreeNode from './TreeNode';

import './style.css';


export default function TreeMap(props){
	const {data, width = 500, height = 500, valueAttribute = 'age', expandTree = false, sumIterator} = props;

	/* Hooks */
	const [rootNode, setRootNode] = useState(null);
	const xScaleRef = useRef(null);
	const yScaleRef = useRef(null);
	const colorScaleRef = useRef(null);
	// These Ref are required when we toggle expand tree value
	const selectedNodeRef = useRef(null);
	const rootNodeRef = useRef(null);

	useEffect(()=>{
		// 1. Set Scaling
		xScaleRef.current = getLinearScaleGetter(width);
		yScaleRef.current = getLinearScaleGetter(height);
		colorScaleRef.current = getOrdinalScaleGetter();

		// 2. Compute Tree Attributes ( value, height, depth)
		const computedRootNode = computeTreeAttributesAndGetRoot(data, sumIterator);

		// 3. Compute Layout Values (x0, x1, y0, y1) for rendering
		computeLayoutValues(width, height, computedRootNode);

		// 4. Trigger Re-render
		if(selectedNodeRef.current){
			const selectedNode = getNode(computedRootNode,selectedNodeRef.current.data.dataId);
			setSelectedNodeAsRootNode(selectedNode)
		} else {
			setRootNode(computedRootNode);
			rootNodeRef.current = computedRootNode;
		}
	},[width, height, valueAttribute]);

	useEffect(()=>{
		if(!rootNodeRef.current || !selectedNodeRef.current){
			return;
		}
		if( rootNodeRef.current !== selectedNodeRef.current){
			let nodeToSetAsRoot = expandTree ? rootNodeRef.current : selectedNodeRef.current;
			const {x0, x1, y0, y1} = nodeToSetAsRoot;
			const xScale = xScaleRef.current;
			const yScale = yScaleRef.current;
			xScale.domain([x0, x1]);
			yScale.domain([y0, y1]);
			setRootNode(nodeToSetAsRoot);
		}
	},[expandTree]);




	/* handlers */
	function setSelectedNodeAsRootNode(nodeWithTreeAndLayoutValues)  {
		const {x0, x1, y0, y1} = nodeWithTreeAndLayoutValues;
		const xScale = xScaleRef.current;
		const yScale = yScaleRef.current;
		xScale.domain([x0, x1]);
		yScale.domain([y0, y1]);

		setRootNode(nodeWithTreeAndLayoutValues);
		selectedNodeRef.current = nodeWithTreeAndLayoutValues;
	};



	/* UI rendering */
	let nodesUI;
	const nodes = rootNode ? (expandTree ? rootNode.leaves() : rootNode.children) : null;
	if (nodes && nodes.length > 0) {
		nodesUI = nodes.map((childNode)=>{
			return <TreeNode key={childNode.data.dataId} node={childNode}
											 onNodeClick={()=>setSelectedNodeAsRootNode(childNode)}
											 xScale={xScaleRef.current}
											 yScale={yScaleRef.current}
											 colorScale={colorScaleRef.current}/>
		});
	}

	return (
	<div className='tree-map'>
		<BreadCrumbs node={rootNode} onItemClick={setSelectedNodeAsRootNode}/>
		<svg height={height} width={width}>
			{nodesUI}
		</svg>
	</div>
	)
}
















