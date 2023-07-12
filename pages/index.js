import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Date from "../components/Date";

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hey, this is Irakli, and I love web dev and currently learning Next JS
          and React
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
  const result = await fetch("http://localhost:3000/api/get-posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const posts = await result.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}
