import { FormEvent, useRef, useState } from "react";
import { ADD_COMMENT_MUTATION } from "../../../../GraphQL/Mutations/commentMutations";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import { addComment } from "../../../../Redux/CommentsSection";
import "./PostForm.scss";

interface Props {
  postId: string;
  lastFocusableElement?: React.MutableRefObject<any>;
}

const PostForm = (props: Props) => {
  const { authState, dispatch } = useRedux();
  const [text, setText] = useState("");
  const [canPost, setCanPost] = useState(true);

  const [addCommentRequest, { isLoading }] = useFetchWithRetry({
    query: ADD_COMMENT_MUTATION,
    variables: { comment: text, postId: props.postId },
    accessToken: authState.accessToken,
  });

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.length) return;
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
      return;
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
          aria-invalid={!text.length}
          ref={formInput}
        ></input>
        <button
          type="submit"
          ref={props.lastFocusableElement}
          disabled={!canPost || isLoading}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
