import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from "../components/seo"
import './blog-md.scss'

const BlogContentPage = ({data, location}) => {
	const nextBlog = location?.state?.next;
	const prevBlog = location?.state?.previous;
	const post = data.markdownRemark;
	const [headerClassName, setHeaderClassName] = useState<string>(`transparentHeader`);
	const [scrollTop, setScrollTop] = useState<number>(0);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	})

	const handleScroll = (): void => {
		let top: number = document.documentElement.scrollTop;
		setScrollTop(top);
		if (scrollTop <= 50) {
			setHeaderClassName("transparentHeader");
		} else {
			setHeaderClassName(`whiteHeader`);
		}
	}
	return(
		<Layout headerClassName={headerClassName}>
			<div className="blog-container">
				<Seo title={post.frontmatter.title} />
				<h1>{post.frontmatter.title}</h1>
				<div className='read-time'>{post.frontmatter.date} <span className='time-dot'>•</span>预计阅读用时：{post.timeToRead}分钟</div>
				<div className='article-content' dangerouslySetInnerHTML={{__html: post.html}}></div>
				<div className="next-prev">
					{prevBlog && <Link to={prevBlog.fields.slug} key={prevBlog.id} className="prev-blog another-blog">
						<div className="title">上一篇</div>
						<div className="blog-name">{prevBlog.frontmatter.title}</div>
					</Link>}
					{nextBlog && <Link to={nextBlog.fields.slug} key={nextBlog.id} className="next-blog another-blog">
						<div className="title">下一篇</div>
						<div className="blog-name">{nextBlog.frontmatter.title}</div>
					</Link>}
				</div>
			</div>
		</Layout>
	)
}

export default BlogContentPage

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				date(formatString: "YYYY-MM-DD")
			}
			timeToRead
		}
	}
`