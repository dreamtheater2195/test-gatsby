
import React from "react"
import Layout from "../components/layout"
import Head from '../components/head'
import { graphql } from "gatsby"
export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Head title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`