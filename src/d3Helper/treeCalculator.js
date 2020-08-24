import {hierarchy} from "d3-hierarchy";

/*
* Creates Root Node Object computing tree values,
* 1. Depth ,
* 2. Height (Children Count)
* 3. Value (Based on the iterator we give for Sum )
* */
function getRootNodeWithTreeValues(data, sumIterator){
	return hierarchy(data)
	.sum(sumIterator)
	.sort(function (a, b) {
		return b.height - a.height || b.value - a.value
	})
}


function computeTreeAttributesAndGetRoot(data, sumIterator){
	const rootNode = getRootNodeWithTreeValues(data,sumIterator);
	//  computing tree Values for the descendants nodes of root node
	rootNode.descendants();
	return rootNode;
}

function getAncestorsPathFor(selectedNode, handler){
	if(!selectedNode || !selectedNode.ancestors){
		return null;
	}
	return selectedNode.ancestors().reverse();
}

function getNode(rootNode, nodeId){
	return rootNode.descendants().find(o => o.data.dataId === nodeId);
}

export {
	computeTreeAttributesAndGetRoot,
	getAncestorsPathFor,
	getNode
}
