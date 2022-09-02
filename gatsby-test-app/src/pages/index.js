import React from "react"
import { graphql } from "gatsby"
export default function Home({ data }) {
  return (
    <div>
      <h1>DialogueWise Demo</h1>
      {JSON.stringify(data)}
      {data.allDialogueWise.edges.map((node, index) => {
        return <div key={index}>{JSON.stringify(node.content)}</div>
      })}
    </div>
  )
}
export const query = graphql`
  query {
    allDialogueWise(filter: { slug: { eq: "Provide slug" } }) {
      edges {
        node {
          content
          slug
          error
        }
      }
    }
  }
`
