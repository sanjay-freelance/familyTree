import {treemap, treemapBinary } from "d3-hierarchy";

function customTiling(width, height){
	return (node, x0, y0, x1, y1) => {
		treemapBinary(node, 0, 0, width, height);
		for (const child of node.children) {
			child.x0 = x0 + child.x0 / width * (x1 - x0);
			child.x1 = x0 + child.x1 / width * (x1 - x0);
			child.y0 = y0 + child.y0 / height * (y1 - y0);
			child.y1 = y0 + child.y1 / height * (y1 - y0);
		}
	}
}

function getTreeMapLayoutCalculator(width,height){
	return treemap()
	.tile(customTiling(width,height))
	.size([width, height])
	.paddingInner(2)
	.round(false);
}

function computeLayoutValues(width,height, rootNode){
	const layoutCalculator = getTreeMapLayoutCalculator(width,height);
	layoutCalculator(rootNode);
}

export {
	computeLayoutValues
}