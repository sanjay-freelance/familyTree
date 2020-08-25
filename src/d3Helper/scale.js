import {scaleLinear, scaleOrdinal } from "d3-scale";

function getLinearScaleGetter(scaleMaxValue){
	return scaleLinear()
	.domain([0, scaleMaxValue])
	.range([0, scaleMaxValue]);
}

//https://github.com/d3/d3-scale-chromatic/blob/master/README.md
function getOrdinalScaleGetter(){
	return scaleOrdinal(['#451119', '#8b5b25', '#936554'])
}

export {
	getLinearScaleGetter,
	getOrdinalScaleGetter
}
