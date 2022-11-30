import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const TestPage = () => (
	<Layout>
		<Seo title="Page two" />
		<h1>Hi from the Test page</h1>
		<p>Welcome to test page !</p>
		<Link to="/">Go back to the homepage</Link>
	</Layout>
)

export default TestPage
