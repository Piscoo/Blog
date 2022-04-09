import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/index.scss"
import BlogList from "../components/blogList/blogList"

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title,
					description
				}
			}
		}
	`)
	const siteConfig = data.site.siteMetadata;
	const [headerClassName, setHeaderClassName] = useState<string>(`transparentHeader`);
	const [scrollTop, setScrollTop] = useState<number>(0);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	})

	const handleScroll = (): void => {
		let top: number = document.documentElement.scrollTop;
		setScrollTop(top);
		if (scrollTop <= 150) {
			setHeaderClassName("transparentHeader");
		} else {
			setHeaderClassName(`whiteHeader`);
		}
	}
	return <Layout
		headerClassName={headerClassName}
		fullScreenContent={true}
	>
		<Seo title="Home" />
		<div className="home-banner">
			<div className="container">
				<h1 className="banner-title">{siteConfig.title}</h1>
				<p className="banner-subtitle">{siteConfig.description}</p>
			</div>
		</div>
		<div className="blog-lists-box">
			<div className="blog-block-title">最新文章</div>
			<BlogList></BlogList>
		</div>
	</Layout>
}
export default IndexPage
