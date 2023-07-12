import Head from "next/head";
import Layout from "../../../components/Layout";
import Date from "../../../components/Date";
import utilStyles from "../../../styles/utils.module.scss";

export default function SinglePost({ post }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Blog: {post.title}</title>
        </Head>
        <h1 className={utilStyles.headingXL}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date}></Date>
        </div>
        <p></p>
        <div>{post.post}</div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const result = await fetch("http://localhost:3000/api/get-post-ids");
  const ids = await result.json();

  return {
    paths: ids.data.map(({ _id }) => {
      return { params: { postid: _id.toString() } };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.postid; //Get post id
  const result = await fetch("http://localhost:3000/api/get-post?postid=" + id);
  const post = await result.json();

  return {
    props: {
      post: post.data,
    },
  };
}
