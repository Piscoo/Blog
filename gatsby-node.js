const path = require('path');
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const result = await graphql(`
		query {
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`)
	const posts = result.data.allMarkdownRemark.edges;
	posts.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/templates/blog-template.tsx`),
			context: {
				slug: node.fields.slug,
			}
		})
	})
}

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src/")
			}
		}
	})
}

const { createFilePath } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: `pages` });
		createNodeField({
			node,
			name: `slug`,
			value: slug,
		})
	}
}