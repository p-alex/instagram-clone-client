import "./Spinner.scss";

interface Props {
  size: "small" | "big";
  center?: boolean;
}

const Spinner = (props: Props) => {
  return (
    <span
      className={props.center ? "loader center" : "loader"}
      style={
        props.size === "small"
          ? { width: "35px", height: "35px", borderWidth: "6px" }
          : { width: "70px", height: "70px", borderWidth: "10px" }
      }
    ></span>
  );
};

export default Spinner;
