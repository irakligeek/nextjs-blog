import Head from "next/head";
import Layout from "../../components/Layout";
import NewPostForm from "../../components/NewPostForm";
import { useState } from "react";

export default function NewPost() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitPost(data) {
    setLoading(true);

    const result = await fetch("/api/submit-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await result.json();

    setMessage(responseData.message);
    setLoading(false);
    setName("");
    setDate("");
    setPost("");
  
  }

  return (
    <Layout>
      <Head>
        <title>Compose New Post</title>
      </Head>
      {message && <p>{message}</p>}
      <NewPostForm
        formData={{
          name: name,
          date: date,
          post: post,
        }}
        onAddPost={submitPost}
        setName={setName}
        setDate={setDate}
        setPost={setPost}
        isLoading={loading}
      ></NewPostForm>
    </Layout>
  );
}
