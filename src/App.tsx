import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import Home from "./Pages/HomePage/Home";
import LoginPage from "./Pages/LoginPage/Login";
import RegisterPage from "./Pages/RegisterPage/Register";
import ProfilePage from "./Pages/ProfilePage/Profile";
import PostPage from "./Pages/PostPage/PostPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import EmailConfirmationPage from "./Pages/EmailConfirmationPage/EmailConfirmationPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordSendEmailPage from "./Pages/ResetPasswordSendEmailPage/ResetPasswordSendEmailPage";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="profile/edit" element={<SettingsPage />} />
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="confirm-email/:confirmationCode"
          element={<EmailConfirmationPage />}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ResetPasswordSendEmailPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="users/:username" element={<ProfilePage />} />
        <Route path="posts/:postId" element={<PostPage />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
