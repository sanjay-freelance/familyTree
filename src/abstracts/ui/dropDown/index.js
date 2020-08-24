import React, {useState} from "react";

export default function DropDown(props){
	const {options, defaultValue, onChange, children} = props;
	const [value, setValue] = useState(defaultValue);

	function handleChange(event){
		setValue(event.target.value);
		onChange && onChange(event.target.value);
	};

	const optionsUI = options.map((optionName, index)=>{
		return <option key={index} value={optionName}>{optionName}</option>
	});

	return (
		<label>
			{children}
			<select value={value} onChange={handleChange}>
				{optionsUI}
			</select>
		</label>
	)
}