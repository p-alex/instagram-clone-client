import { useEffect, useState } from "react";
import "./SettingsMobileNav.scss";

interface Props {
  currentTab: "edit profile" | "change password";
  setCurrentTab: React.Dispatch<
    React.SetStateAction<"edit profile" | "change password">
  >;
}

const SettingsMobileNav = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(false);
  }, [props.currentTab]);
  return (
    <nav className="settingsMobileNav">
      <div className="settingsMobileNav__topBar">
        <button
          className="settingsMobileNav__toggleDrawerBtn"
          aria-label="toggle settings nav"
          onClick={() => setIsActive(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <h2>{props.currentTab}</h2>
      </div>

      {isActive && (
        <div className="settingsMobileNav__drawer">
          <div
            className="settingsMobileNav__drawerBackdrop"
            onClick={() => setIsActive(false)}
          ></div>
          <div className="settingsMobileNav__drawerContainer">
            <button
              className="settingsMobileNav__closeDrawerBtn"
              onClick={() => setIsActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button
              className={
                props.currentTab === "edit profile"
                  ? "settingsMobileNav__drawerBtn  activeTab"
                  : "settingsMobileNav__drawerBtn"
              }
              onClick={() => props.setCurrentTab("edit profile")}
            >
              Edit profile
            </button>
            <button
              className={
                props.currentTab === "change password"
                  ? "settingsMobileNav__drawerBtn  activeTab"
                  : "settingsMobileNav__drawerBtn"
              }
              onClick={() => props.setCurrentTab("change password")}
            >
              Change password
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SettingsMobileNav;
