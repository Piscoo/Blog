import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import "./blogList.scss"

const Blogs = () => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark(
				sort: {fields: [frontmatter___date], order: DESC}
			) {
				totalCount
				edges {
					node {
						id
						frontmatter {
							tags
							title
							date
							categories
						}
						fields {
							slug
						}
						excerpt
					}
					next {
						id
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
					previous {
						id
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`)
	return (
		<div className="blogListContainer">
			{data.allMarkdownRemark.edges.map(({node, next, previous}) => {
				return (
					<Link to={node.fields.slug} key={node.id} state={{next, previous}} className="blog-item">
						<div className="blog-title">{node.frontmatter.title}</div>
						<div className="blog-bottom-info">
							<div className="blog-tags">
								<span className="blog-tag">{node.frontmatter.categories}</span>
								<span className="blog-tag">{node.frontmatter.tags}</span>
							</div>
							<div className="blog-time">{node.frontmatter.date}</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default Blogs