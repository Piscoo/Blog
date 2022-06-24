import React from 'react'
import Layout from '../components/layout'
import BlogList from "../components/blogList/blogList"

const Blogs = () => {
	return (
		<Layout fullScreenContent={true}>
			<div className="water-bg-page" style={{paddingTop: '120px'}}>
				<div style={{fontSize: `35px`, color: `#0a274d`, textAlign: `center`, fontWeight: `bold`}}>所有文章</div>
				<BlogList></BlogList>
			</div>
		</Layout>
	)
}

export default Blogs