import {scaleLinear, scaleOrdinal } from "d3-scale";
import {schemeCategory10 } from "d3-scale-chromatic";

function getLinearScaleGetter(domainMaxValue, rangeMaxValue){
	rangeMaxValue = rangeMaxValue == undefined ? domainMaxValue : rangeMaxValue;
	return scaleLinear()
	.domain([0, domainMaxValue])
	.range([0, rangeMaxValue]);
}

//https://github.com/d3/d3-scale-chromatic/blob/master/README.md
function getOrdinalScaleGetter(){
	return scaleOrdinal(schemeCategory10)
}


export {
	getLinearScaleGetter,
	getOrdinalScaleGetter
}
