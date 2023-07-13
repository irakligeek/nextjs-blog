import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Date from "../components/Date";
import { getPosts } from "../util/posts";
import { useRef } from "react";

export default function Home({ posts }) {

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent()); //Get editor content
    }
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hey, this is Irakli, and this is a simple blog I built in React and NextJS. It's very basic, 
          but I am planning on adding more features such as authentification, images to blog posts, etc.
          Github repo for this project can be 
          found <a href="https://github.com/irakligeek/nextjs-blog" target="_blank">here</a>
        </p>

        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ _id, title, date, post }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/posts/${_id}`}> {title}</Link> <br />
              Posted on: <Date dateString={date}></Date>
            </li>
          ))}
        </ul>
        <Link href="posts/new-post/">Write a new post {">>"}</Link>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  return {
    revalidate: 60,
    props: {
      posts: posts.map(({ _id, title, date, post }) => {
        return { _id: _id.toString(), title: title, date: date, post: post };
      }),
    },
  };
}
