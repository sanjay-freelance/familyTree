import  {childCountLayoutHashMap} from './hardcodedLayout'
/*
* Matrix (row x col) is Created with value 0
* 0 - indicates cell is not assigned for square
* example: 3 * 4
* [ [ 0 , 0 , 0 , 0],
*   [ 0 , 0 , 0 , 0],
*   [ 0 , 0 , 0 , 0] ]
*
* indicates  12 unit square possible in this rectangle of 3/4 ratio
* square n : 4 , 9 will create bigger square
* So possible square count in this grid
* 1. 12     (1*1) all squares takes 1 unit
* 2.  9, 6  (2*2) (2 squares takes unit 2, rest unit 1)
* 3.  4     (3*3) (1 square takes unit 3 rest unit 1
* */
function createGrid(rowsCount , colsCount) {
	const grid =[];
	for(let y = 0; y < rowsCount; y++) {
		let row = [];
		for(let x = 0; x < colsCount; x++) {
			row.push(0)
		}
		grid.push(row);
	}
	return grid;
}


//todo: Remove this (Random generator logic)
// After assigning square in a grid or grids, we have collect remaining grids
// to assign next grid
function getEmptyCellsFromGrid(grid, rowsCount, colsCount) {
	const emptyCells = [];

	for(let y = 0; y < rowsCount; y++) {
		for(let x = 0; x < colsCount; x++) {
			if( grid[y][x] == 0 )
				emptyCells.push({x:x, y:y, unit:0})
		}
	}

	return emptyCells;
}

//todo: Remove this (Random generator logic)
function doesSquareFit( grid, cell, rowsCount, colsCount ) {
	const {x, y, unit} = cell;

	for(let xPos = x; xPos< (x + unit); xPos++ ) {
		for(let yPos = y; yPos< (y + unit); yPos++) {
			if( xPos >= colsCount || yPos >= rowsCount || grid[yPos][xPos] == 1 ) {
				return false;
			}
		}
	}

	return true;
}

function getScale(factor){
	return (val)=>{
		return val * factor;
	}
}


function setMaxSquare(grid, cell, rowsCount, colsCount ) {
	cell.unit = 1;
	// todo: remove this hard coded ratio for max square 3/4
	while(cell.unit < (colsCount * 3 / 4)) {
		cell.unit++;
		if( ! doesSquareFit( grid, cell, rowsCount, colsCount )) {
			cell.unit--;
			return;
		}
	}
}


function computeAndGetTilesFromData( data, rowsCount, colsCount) {
	// Initialization
	const grid = createGrid(rowsCount,colsCount);
	let emptyCells = getEmptyCellsFromGrid(grid, rowsCount, colsCount);

	const dataAsTiles = [];

	while( emptyCells.length > 0 ) {

		// 1. todo: Get data with highest value
		const index = Math.floor(Math.random() * emptyCells.length);

		// 2. get a tile for that data
		const cell = emptyCells.splice(index,1)[0];

		// 3. todo: Assign Bigger tile
		setMaxSquare(grid, cell, rowsCount, colsCount);

		// 4. Mark the assigned grid cells occupied by the tile
		const {x, y, unit} = cell;
		for(let xPos = x; xPos < (x + unit); xPos++ ) {
			for(let yPos = y; yPos < (y + unit); yPos++) {
				grid[yPos][xPos] = 1;
			}
		}

		//5. Tile with Layout Values
		dataAsTiles.push(cell);

		// 6. Collect empty empty cells for next iteration
		emptyCells = getEmptyCellsFromGrid(grid, rowsCount, colsCount);
	}

	console.log(dataAsTiles);
	return dataAsTiles;

}


// Returns count of all squares
// in a rectangle of size m x n
/*
*
* Consider a 3×4 rectangle there are a total of 20 squares.
* Number of squares of side 1 unit: 3×4=12.
* Number of squares of side 2 units: 2×3=(3−1)×(4−1)=6.
* Number of squares of side 3 units: 1×2=(3−2)×(4−2)=2.
* Total number of squares =12+6+2=20.
* */
function countSquaresInARectangle(rows, cols) {
	const squaresCountByGridSize = []
	for (let i = 0; (i < rows && i < cols); i++){
		const squaresCount = (rows - i) * (cols - i)
		squaresCountByGridSize.push(squaresCount );
	}
	return squaresCountByGridSize
}

function getClosestFactorForNumber(area){
		let areaSqrt = Math.floor(Math.sqrt(area));
		while (area % areaSqrt != 0) {
			areaSqrt--;
		}
		return [areaSqrt, area / areaSqrt];
}

function normalizeTo(array, end){
	const ratio = Math.max(...array) / end;

	return array.map(function (val) {
		return Math.round(val / ratio);
	});
}

function areaOfAllSquares (array) {
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		const side = array[i];
		sum = sum + (side * side);
	}
	return sum;
}


function getRowsAndColumnsFromChildren(values){
	const normalizedValues = normalizeTo(values,5);
	const area = areaOfAllSquares(normalizedValues);
	const factor = getClosestFactorForNumber(area);

	return factor;
}



export {
	getScale
}