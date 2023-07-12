import { useRef } from "react";
import Layout from "./Layout";
import styles from "./newPostForm.module.scss";

function NewPostForm(props) {
  
  const titleInputRef = useRef();
  const postInputRef = useRef();
  const dateInputRef = useRef();

  const isLoading = props.isLoading;

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredPost = postInputRef.current.value;

    const postData = {
      title: enteredTitle,
      date: enteredDate,
      post: enteredPost,
    };

    props.onAddPost(postData);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={props.formData.name}
          ref={titleInputRef}
          onChange={(e) => props.setName(e.target.value)}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="post-date">Date</label>
        <input
          type="date"
          id="post-date"
          value={props.formData.date}
          ref={dateInputRef}
          onChange={(e) => props.setDate(e.target.value)}
        />
      </div>

      <div className={styles.control}>
        <label htmlFor="post-body">Post</label>
        <textarea
          value={props.formData.post}
          id="post-body"
          rows="5"
          ref={postInputRef}
          onChange={(e) => props.setPost(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <button>{isLoading ? "Adding ..." : "Add New Post"}</button>
      </div>
    </form>
  );
}

export default NewPostForm;
