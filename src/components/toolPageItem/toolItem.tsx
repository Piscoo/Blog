import React from 'react'
import { Link } from 'gatsby'
import "./toolItem.scss"


const ToolItem = ({info}) => {
	const {href, name: toolName, desc, icon} = info;
	return (
		<div className="toolItemContainer">
			<Link to={`${href}`} key={`${href}`} className='toolItem'>
				<div className={`tool-icon ${icon}`}></div>
				<div className="tool-info">
					<div className="tool-name">{toolName}</div>
					<div className="tool-desc">{desc}</div>
				</div>
			</Link>
		</div>
	)
}

export default ToolItem