

const childCountLayoutHashMap = {
	'10' : {
		layout: [
			{x: 0, y: 0, unit: 4},
			{x: 4, y: 0, unit: 2},
			{x: 4, y: 2, unit: 1},
			{x: 4, y: 3, unit: 1},
			{x: 5, y: 2, unit: 1},
			{x: 5, y: 3, unit: 1},
			{x: 6, y: 0, unit: 1},
			{x: 6, y: 1, unit: 3},
			{x: 7, y: 0, unit: 1},
			{x: 8, y: 0, unit: 1},
		],
		sortOrder: [0,7,1,2,3,4,5,6,8,9],
		gridSize: [9,4]
	},
	'9': {
		layout: [
			{x: 0, y: 0, unit: 2},
			{x: 0, y: 2, unit: 1},
			{x: 0, y: 3, unit: 1},
			{x: 1, y: 2, unit: 1},
			{x: 1, y: 3, unit: 1},
			{x: 2, y: 0, unit: 1},
			{x: 2, y: 1, unit: 3},
			{x: 3, y: 0, unit: 1},
			{x: 4, y: 0, unit: 1},
		],
		sortOrder: [7,0,1,2,3,4,5,6,8],
		gridSize: [5,4]
	}
};

function getTilesForChildren(children) {
	const totalTiles = children.length; //[5, 2, 2, 1, 1]
	const layoutObject = childCountLayoutHashMap[totalTiles.toString()];
	const {layout, sortOrder, gridSize} = layoutObject;

	const dataAsTiles = [];

	for(let i = 0; i < totalTiles; i++){
		const child = children[i];
		const tile = {
			layout: Object.assign({},layout[sortOrder[i]]),
			data: child
		};
		dataAsTiles.push(tile);
	}
	return {
		rows: gridSize[0],
		cols: gridSize[1],
		tiles: dataAsTiles
	};

}


export {
	getTilesForChildren
}