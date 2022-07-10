import { useEffect, useState } from "react";
import useRedux from "../../Hooks/useRedux";
import { useNavigate } from "react-router-dom";
import ChangePasswordTab from "../../Components/ChangePasswordTab/ChangePasswordTab";
import EditProfileTab from "../../Components/EditProfileTab/EditProfileTab";
import SettingsNav from "../../Components/SettingsNav/SettingsNav";
import Layout from "../../Layout/Layout";
import "./SettingsPage.scss";
import SettingsMobileNav from "../../Components/SettingsMobileNav/SettingsMobileNav";
import { Helmet } from "react-helmet";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { authState } = useRedux();

  const [currentTab, setCurrentTab] = useState<
    "edit profile" | "change password"
  >("edit profile");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authState.user?.id) navigate("/login");
  }, [authState.user, navigate]);

  return (
    <Layout>
      <Helmet>
        <title>{"Settings page • Bubble"}</title>
      </Helmet>
      <div className="settingsPage">
        <div className="settingsPage__container">
          <SettingsNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SettingsMobileNav
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          {currentTab === "edit profile" && <EditProfileTab />}
          {currentTab === "change password" && <ChangePasswordTab />}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
