import { useEffect, useState } from "react";
import "./CropperFooter.scss";

const CropperFooter = ({
  setAspectRatio,
  aspectRatio,
  lastFocusableElementRef,
}: {
  setAspectRatio: React.Dispatch<React.SetStateAction<number>>;
  aspectRatio: number;
  lastFocusableElementRef: any;
}) => {
  const [activeTab, setActiveTab] = useState("");

  const handleChangeActiveTab = (tab: string) => {
    if (activeTab === tab) return setActiveTab("");
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab("");
  }, [aspectRatio]);

  return (
    <div className="cropperFooter">
      <div className="cropperFooter__aspect">
        <button
          onClick={() => handleChangeActiveTab("aspect")}
          className={
            activeTab === "aspect"
              ? "cropperFooter__btn active-tab"
              : "cropperFooter__btn"
          }
          ref={lastFocusableElementRef}
        >
          <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
        </button>
        {activeTab === "aspect" && (
          <div className="cropperFooter__aspectPopup">
            <button
              onClick={() => setAspectRatio(1 / 1)}
              className={
                aspectRatio === 1 / 1
                  ? "cropperFooter__aspectBtn current-aspect"
                  : "cropperFooter__aspectBtn"
              }
            >
              1:1 <div className="square geometric"></div>
            </button>
            <button
              onClick={() => setAspectRatio(4 / 5)}
              className={
                aspectRatio === 4 / 5
                  ? "cropperFooter__aspectBtn current-aspect"
                  : "cropperFooter__aspectBtn"
              }
            >
              4:5 <div className="vertical-rectangle geometric"></div>
            </button>
            <button
              onClick={() => setAspectRatio(16 / 9)}
              className={
                aspectRatio === 16 / 9
                  ? "cropperFooter__aspectBtn current-aspect"
                  : "cropperFooter__aspectBtn"
              }
            >
              16:9 <div className="horizontal-rectangle geometric"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropperFooter;
