const postQuery = `{
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/" } }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title
            teaser
            date(formatString: "MMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`
const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`title:20`] }
const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Articles`,
    settings,
  },
]
module.exports = queries
