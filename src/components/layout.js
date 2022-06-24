/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import Header from "./header/header"
import "./layout.scss"

const Layout = ({ children, headerClassName, fullScreenContent = false }) => {
	return (
		<div style={{ width: `100%`, height: `100%` }}>
			<Header
				headerClassName={headerClassName}
			/>
			<>
				<main style={{ paddingTop: `${fullScreenContent ? 0 : "60px"}` }}>{children}</main>
				{/* <main>{children}</main> */}
			</>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
