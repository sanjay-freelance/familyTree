import React, {useState} from "react";

export default function CheckBox(props){
	const {onChange, children, defaultValue} = props;
	const [checked, setChecked] = useState(defaultValue);

	function handleChange(){
		setChecked(!checked);
		onChange && onChange(!checked);
	};


	return (
		<label>
			{children}
			<input type="checkbox" checked={checked}
						 onChange={handleChange} />
		</label>
	)
}