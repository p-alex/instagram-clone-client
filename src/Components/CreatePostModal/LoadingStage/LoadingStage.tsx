import { useEffect } from "react";
import Spinner from "../../../Ui/Spinner";
import "./LoadingStage.scss";

interface Props {
  lastFocusableElementRef: React.MutableRefObject<any>;
}

const LoadingStage = (props: Props) => {
  useEffect(() => {
    props.lastFocusableElementRef.current.focus();
  }, []);
  return (
    <div className="loadingStage">
      <div className="loadingStage__container">
        <Spinner />
        <p ref={props.lastFocusableElementRef} tabIndex={0}>
          Loading
        </p>
      </div>
    </div>
  );
};

export default LoadingStage;
