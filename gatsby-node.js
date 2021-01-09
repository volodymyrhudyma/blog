const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }        
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tag) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const posts = result.data.allMarkdownRemark.edges
  const tags = result.data.tags.group

  // Create blog post page
  const blogPostTemplate = path.resolve(`src/templates/blog.js`)
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  // Create blog-list pages
  const postsPerPage = 7
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create tag-list pages
  const tagPostsPerPage = 7
  tags.forEach(({ fieldValue, totalCount }) => {
    const numTagPostsPages = Math.ceil(totalCount / tagPostsPerPage)
    createPage({
      path: `/tag/${fieldValue.toLowerCase()}`,
      component: path.resolve("./src/templates/tag-list.js"),
      context: {
        tag: fieldValue,
        limit: tagPostsPerPage,
        skip: 0,
        numPages: numTagPostsPages,
        currentPage: 1,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
