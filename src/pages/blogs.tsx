import React from 'react'
import Layout from '../components/layout'
import BlogList from "../components/blogList/blogList"

const Blogs = () => {
	return (
		<Layout>
			<div style={{fontSize: `35px`, color: `#0a274d`, textAlign: `center`, fontWeight: `bold`, marginTop: `60px`}}>所有文章</div>
			<BlogList></BlogList>
		</Layout>
	)
}

export default Blogs