module.exports = {
  siteMetadata: {
    title: `JavaScript tutorials`,
    description: `Become an expert in JavaScript by learning from an experienced developer.`,
    author: `https://vhudyma.netlify.com/`,
  },
  plugins: [
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
        name: `JavaScript tutorials`,
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
        trackingId: "",
        head: true,
      },
    },
  ],
}
