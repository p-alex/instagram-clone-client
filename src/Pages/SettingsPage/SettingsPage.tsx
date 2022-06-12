import { useEffect, useState } from "react";
import useRedux from "../../Hooks/useRedux";
import { useNavigate } from "react-router-dom";
import ChangePasswordTab from "../../Components/ChangePasswordTab/ChangePasswordTab";
import EditProfileTab from "../../Components/EditProfileTab/EditProfileTab";
import SettingsNav from "../../Components/SettingsNav/SettingsNav";
import Layout from "../../Layout/Layout";
import "./SettingsPage.scss";

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
      <div className="settingsPage">
        <SettingsNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {currentTab === "edit profile" && <EditProfileTab />}
        {currentTab === "change password" && <ChangePasswordTab />}
      </div>
    </Layout>
  );
};

export default SettingsPage;
