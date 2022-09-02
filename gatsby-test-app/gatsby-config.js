/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-dialoguewise`,
      options: {
        accessToken: "Provide access token",
        dialogues: [
          {
            slug: "Provide slug",
            isPilot: true,
          },
        ],
      },
    },
  ],
}
