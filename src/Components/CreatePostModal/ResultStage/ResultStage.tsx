import { useEffect } from "react";
import "./ResultStage.scss";

interface Props {
  error: string;
  lastFocusableElementRef: React.MutableRefObject<any>;
}

const ResultStage = (props: Props) => {
  useEffect(() => {
    props.lastFocusableElementRef.current.focus();
  }, []);
  return (
    <div className="resultStage">
      <div className="resultStage__container">
        {!props.error ? (
          <i className="fa-solid fa-circle-check"></i>
        ) : (
          <i className="fa-solid fa-circle-exclamation"></i>
        )}
        <p ref={props.lastFocusableElementRef} tabIndex={0}>
          {!props.error ? "Your post has been shared." : props.error}
        </p>
      </div>
    </div>
  );
};

export default ResultStage;
