const queries = require("./src/utils/algolia")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

module.exports = {
  siteMetadata: {
    title: `Become JavaScript And ReactJS Expert`,
    description: `Become an expert in JavaScript and ReactJS by reading the best and easiest tutorials you can find.`,
    author: `https://www.vhudyma-portfolio.eu`,
    siteUrl: `https://www.vhudyma-blog.eu`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000,
        enablePartialUpdates: true,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://vhudyma-portfolio.us10.list-manage.com/subscribe/post?u=6a773660aa826636b1a44c965&amp;id=3f7598a352",
        timeout: 3500,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./static/favicon/favicon.png",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": "src/components",
          "@utils": "src/utils",
        },
        extensions: ["js"],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `comments`,
        path: `${__dirname}/content/comments`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JavaScript And ReactJS Tutorials With Best Practices`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#1ca086`,
        theme_color: `#1ca086`,
        display: `minimal-ui`,
        icon: "./static/favicon/favicon.png",
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: `#1ca086`,
        showSpinner: false,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-168111170-1",
        head: true,
      },
    },
  ],
}
