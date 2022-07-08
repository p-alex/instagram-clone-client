import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import Spinner from "./Ui/Spinner";
const Home = lazy(() => import("./Pages/HomePage/Home"));
const LoginPage = lazy(() => import("./Pages/LoginPage/Login"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage/Register"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage/Profile"));
const PostPage = lazy(() => import("./Pages/PostPage/PostPage"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage/SettingsPage"));
const EmailConfirmationPage = lazy(
  () => import("./Pages/EmailConfirmationPage/EmailConfirmationPage")
);
const ResetPasswordPage = lazy(
  () => import("./Pages/ResetPasswordPage/ResetPasswordPage")
);
const ResetPasswordSendEmailPage = lazy(
  () => import("./Pages/ResetPasswordSendEmailPage/ResetPasswordSendEmailPage")
);
const SuggestionsPage = lazy(
  () => import("./Pages/SuggestionsPage/SuggestionsPage")
);

function App() {
  return (
    <Suspense fallback={<Spinner size={"small"} center={true} />}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path="profile/edit" element={<SettingsPage />} />
            <Route path="suggestions" element={<SuggestionsPage />} />
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="confirm-email/:confirmationCode"
            element={<EmailConfirmationPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="reset-password"
            element={<ResetPasswordSendEmailPage />}
          />
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
    </Suspense>
  );
}

export default App;
