import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./header.scss"
// import Dropdown from './dropdown'
import { Menu, Dropdown } from 'antd'

const Header = (props) => {
	const menu = (
		<Menu>
			<Menu.Item key="1"><a target="_blank" rel="noopener noreferrer" href="https://github.com/Piscoo" className="link-of-drop">GitHub</a></Menu.Item>
			<Menu.Item key="2"><a target="_blank" rel="noopener noreferrer" href="https://juejin.cn/user/2225067267984558" className="link-of-drop">掘金</a></Menu.Item>
		</Menu>
	)
	return (
		<header
			className={`${props?.headerClassName || ''} site-header`}
		>
			<div>
				<Link
					to="/"
					className="header_title"
				>
					Pisco
				</Link>
			</div>
			<div className="header-menu">
				<Link to="/blogs" className="header-item">Blog</Link>
				<Link to="/about" className="header-item">About</Link>
				<div className="header-item dropdown-item">
					<Dropdown overlay={menu} placement="bottom" arrow={{pointAtCenter: true}}>
						<span>Follow Me</span>
					</Dropdown>
				</div>
			</div>
		</header>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
