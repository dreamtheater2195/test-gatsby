import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Head from '../components/head'

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Head title="Home" />
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
        `}
        >
          Contentful
        </h1>
        <h4>{data.allContentfulBlogPost.totalCount} Posts</h4>
        {data.allContentfulBlogPost.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
                to={node.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `
  }
              >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.publishedDate}
                </span>
              </h3>
            </Link>
          </div>
        ))}
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Markdown
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `
  }
              >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: {
      fields: publishedDate,
      order: DESC
    }) {
      totalCount
      edges {
        node {
          id
          title
          slug
          publishedDate(fromNow: true)
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`