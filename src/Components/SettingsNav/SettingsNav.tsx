import './SettingsNav.scss';
const SettingsNav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: 'edit profile' | 'change password';
  setCurrentTab: React.Dispatch<React.SetStateAction<'edit profile' | 'change password'>>;
}) => {
  return (
    <div className="settingsNav">
      <button
        className={
          currentTab === 'edit profile'
            ? 'settingsNav__btn settingsNav__btn--active'
            : 'settingsNav__btn'
        }
        onClick={() => setCurrentTab('edit profile')}
      >
        Edit Profile
      </button>
      <button
        className={
          currentTab === 'change password'
            ? 'settingsNav__btn settingsNav__btn--active'
            : 'settingsNav__btn'
        }
        onClick={() => setCurrentTab('change password')}
      >
        Change Password
      </button>
    </div>
  );
};

export default SettingsNav;
