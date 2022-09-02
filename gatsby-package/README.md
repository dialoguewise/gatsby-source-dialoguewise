# ![Dialoguewise](https://dialoguewise.com/images/logo-dark.svg)

# Gatsby source plugin for Dialoguewise CMS

This is a Gatsby source plugin for building websites using [Dialoguewise](https://dialoguewise.com) as a data source.

## Install

`npm install --save gatsby-source-dialoguewise`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-dialoguewise`,
      options: {
        accessToken: "Provide your access token.",
        dialogues: [
          {
            slug: "Provide the slug",
            isPilot: false,
            //Any variables you need to pass. This is optional.
            variableList: {
              "@variable-name": "variable value",
            },
          },
        ],
      },
    },
  ],
};
```

## How to query

You can query dialogue nodes like the following:

```graphql
{
  allDialogueWise {
    edges {
      node {
        slug
        content
        error
      }
    }
  }
}
```

To filter by the `slug` you specified in the config:

```graphql
{
  allDialogueWise(filter: { slug: { eq: "Your slug name" } }) {
    edges {
      node {
        slug
        content
        error
      }
    }
  }
}
```

## Example usage

The following example demonstrates how you can fetch contents and display them in your Gatsby app.
For more details, please checkout the sample application in [gatsby-test-app](https://github.com/dialoguewise/gatsby-source-dialoguewise/blob/master/gatsby-test-app) folder

```javascript
import React from "react";
import { graphql } from "gatsby";

export default function GatsbyDemoApp({ data }) {
  return (
    <div>
      <h1>DialogueWise Demo</h1>

      {data.allDialogueWise.edges.map((node, index) => {
        //The node.content will now contain your content.
      })}
    </div>
  );
}

export const query = graphql`
  query {
    allDialogueWise(filter: { slug: { eq: "Provide your slug" } }) {
      edges {
        node {
          content
          slug
          error
        }
      }
    }
  }
`;
```
