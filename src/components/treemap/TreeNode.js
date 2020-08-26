import React, {useState} from "react";

function getLabel(relation, gender){
	let labelName;
	switch (relation) {
		case 4:
			labelName = 'You';
			break;
		case 3:
			labelName = gender == 'male' ? 'Father' : 'Mother';
			break;
		case 2:
			labelName = gender == 'male' ? 'Uncle' : 'Aunt';
			break;
		case 1:
			labelName = gender == 'male' ? 'Brother' : 'Sister';
			break;
	}

	return labelName;
}

export default function TreeNode(props){
	const { node, xScale, yScale, colorScale} = props;

	const { x0, y0, x1, y1, data} = node;
	const {name, relation, gender, image} = data;

	const [showProfile, setShowProfile] = useState(false)

	// 1. Dimensions
	const xPos = xScale(x0);
	const yPos = yScale(y0);
	const nodeWidth = (xScale(x1) - xPos);
	const nodeHeight = (yScale(y1) - yPos);

	// 2. Background color values
	const colorValue = colorScale(relation);

	function mouseOverHandler(){
		setShowProfile(true);
	}

	function mouseLeaveHandler(){
		setShowProfile(false);
	}


	const nodeStyle = {
		position: 'absolute',
		display: 'flex',
		left: xPos,
		top: yPos,
		borderRadius: '8px',
		backgroundColor: colorValue,
		width: nodeWidth,
		height: nodeHeight
	};

	if(image){
		nodeStyle['backgroundImage'] = `url(static/img/${image}.png)`;
		nodeStyle['backgroundSize'] = `contain`;
		nodeStyle['backgroundRepeat'] = `no-repeat`;
	}

	const nodeContentStyle = {
		padding: '8px',
		display: 'flex',
		flex: '1'
	};

	const labelStyle = {
		color: 'white',
		alignSelf: 'flex-end'
	};


	const labelName = getLabel(relation, gender);

	let contentUI = null;
	if(showProfile){
		contentUI = (<MouseOverDiv data={data}></MouseOverDiv>)
	} else {
		contentUI = (
		<label style={labelStyle}>{labelName}</label>
		)
	}

	return (
		<div style={nodeStyle}>
			<div style={nodeContentStyle}
					 onMouseOver={data.profilePic ? mouseOverHandler : null}
					 onMouseLeave={data.profilePic ? mouseLeaveHandler: null}>
				{contentUI}
			</div>
		</div>
	);
}

// todo : Bad code: move data specific logic out of here, use css or styleComponent
function MouseOverDiv(props){
	const {data} = props;
	const {name,occupation,location,
		donated,themes,funds,
		lastContribution,profilePic} = data;

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		padding: '12px'
	}

	const profileStyle = {
		display: 'flex',
		flex: 1,
		justifyContent: 'space-between'
	};

	const profilePicStyle = {

	};

	const profileContentStyle = {
		display: 'flex',
		flexDirection: 'column'
	};



	const contributionStyle = {
		flex: 1,
		color: '#8d5335',
		marginTop: '12px',
		fontSize: '10px',
		fontStyle: 'italic'
	};

	const profilePicPath = profilePic ? `static/img/${profilePic}.png` : ''

	const headerStyle = {
		color: '#efad5f',
	}

	const labelStyle = {
		color: 'white',
		fontSize: '12px',
	}

	const titleStyle = {
		marginBottom: '4px',
		fontSize: '20px',
		fontWeight: 600
	}
	const headerContainerStyle = {
		marginBottom: '4px',
		fontSize: '14px',
		fontWeight: 400
	}



	const labelContainerStyle = {
		marginBottom: '12px'
	}

	const fundsStyle = {
		display: 'flex',
		flex: 1,
		marginTop: '20px',
	};

	const firstFundContainerStyle = {
		borderRight: '1px solid #8d5335',
		paddingRight : "24px"
	};

	const fundContainerStyle = {
		borderRight: '1px solid #8d5335',
		paddingLeft : "24px",
		paddingRight : "24px"
	};

	const lastFundContainerStyle = {
		paddingLeft : "24px",
		paddingRight : "24px"
	};

	const fundsHeaderStyle = {
		color: '#efad5f',
		fontSize: '12px',
		marginBottom: '10px'
	}

	const fundsLabelStyle = {
		color: 'white',
		fontSize: '20px',
	}

	const contributeAt = `Last contributed on ${lastContribution}`;

	return (
		<div style={containerStyle}>
			<div style={profileStyle}>
				<div style={profileContentStyle}>
					<div style={labelContainerStyle}>
						<div style={titleStyle}>
							<span style={headerStyle}>{name}</span>
						</div>
						<div>
							<span style={labelStyle}>You</span>
						</div>
					</div>
					<div style={labelContainerStyle}>
						<div style={headerContainerStyle}>
							<span style={headerStyle}>Occupation</span>
						</div>
						<div>
							<span style={labelStyle}>{occupation}</span>
						</div>
					</div>
					<div style={labelContainerStyle}>
						<div style={headerContainerStyle}>
							<span style={headerStyle}>Location</span>
						</div>
						<div>
							<span style={labelStyle}>{location}</span>
						</div>
					</div>
				</div>
				<div style={profilePicStyle}>
					<img src={profilePicPath}  width="100" height="100"/>
				</div>
			</div>
			<div style={fundsStyle}>
				<div style={firstFundContainerStyle}>
					<span style={fundsHeaderStyle}>Donated</span>
					<div>
						<span style={fundsLabelStyle}>{donated}</span>
					</div>
				</div>
				<div style={fundContainerStyle}>
					<span style={fundsHeaderStyle}>Themes</span>
					<div>
						<span style={fundsLabelStyle}>{themes}</span>
					</div>
				</div>
				<div style={lastFundContainerStyle}>
					<span style={fundsHeaderStyle}>Funds</span>
					<div>
						<span style={fundsLabelStyle}>{funds}</span>
					</div>
				</div>

			</div>
			<div style={contributionStyle}>
				<span>{contributeAt}</span>
			</div>
		</div>
	);
}