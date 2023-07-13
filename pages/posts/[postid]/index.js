import Head from "next/head";
import Layout from "../../../components/Layout";
import Date from "../../../components/Date";
import utilStyles from "../../../styles/utils.module.scss";
import { getPost, getPostIds } from "../../../util/posts";

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

export async function getStaticPaths(context) {
  const ids = await getPostIds();
  return {
    paths: ids.map(({ _id }) => {
      return { params: { postid: _id.toString() } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const id = context.params.postid; //Get post id

  const post = await getPost(id);
  return {
    revalidate: 60,
    props: {
      post: {
        _id: post._id.toString(),
        title: post.title,
        date: post.date,
        post: post.post,
      },
    },
  };
}
