import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/head'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost({ slug: { eq: $slug }) {
      title
      publishedDate(fromNow: true)
      body {
        json
      }
    }
  }
`

export default ({ data }) => {
  const post = data.contentfulBlogPost
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img src={url} alt={alt} />
      }
    }
  }
  return (
    <Layout>
      <Head title={post.title} />
      <div>
        <h1>{post.title}</h1>
        <p>{post.publishedDate}</p>
        {documentToReactComponents(post.body.json, options)}
      </div>
    </Layout>
  )
}
