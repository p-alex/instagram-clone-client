import { FormEvent, useRef, useState } from "react";
import { ADD_COMMENT_MUTATION } from "../../../../GraphQL/Mutations/commentMutations";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import { addComment } from "../../../../Redux/CommentsSection";
import "./PostForm.scss";

const PostForm = () => {
  const { authState, postState, dispatch } = useRedux();
  const [text, setText] = useState("");
  const [canPost, setCanPost] = useState(true);

  const [addCommentRequest, { isLoading }] = useFetchWithRetry({
    query: ADD_COMMENT_MUTATION,
    variables: { comment: text, postId: postState.post?.id },
    accessToken: authState.accessToken,
  });

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCanPost(false);
    try {
      const response = await addCommentRequest();
      if (response.success) {
        dispatch(addComment(response?.comment));
        setText("");
        setTimeout(() => {
          setCanPost(true);
        }, 5000);
      }
    } catch (error: any) {
      console.log(error.message);
      setCanPost(true);
    }
  };

  const formInput = useRef<any>();

  return (
    <form className="postForm" onSubmit={(e) => handleAddComment(e)}>
      <div className="postForm__inputAndSubmit">
        <input
          type="text"
          className="postForm__input"
          placeholder={"Add a comment..."}
          value={text}
          onChange={(event) => setText(event.target.value)}
          ref={formInput}
        ></input>
        <button type="submit" disabled={isLoading || !text || !canPost}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
