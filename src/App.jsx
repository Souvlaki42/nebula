import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./features/core/HomePage";
import DashboardPage from "./features/core/DashboardPage";
import SignUpPage from "./features/auth/SignUpPage";
import LogInPage from "./features/auth/LogInPage";
import TermsOfService from "./features/misc/TermsOfService";
import PrivacyPolicy from "./features/misc/PrivacyPolicy";
import Layout from "./features/core/Layout";
import DashboardArea from "./features/core/DashboardArea";
import NotesArea from "./features/core/NotesArea";
import NotebooksArea from "./features/core/NotebooksArea";
import SettingsArea from "./features/core/SettingsArea";
import TaggedArea from "./features/core/TaggedArea";
import UntaggedArea from "./features/core/UntaggedArea";
import PinnedArea from "./features/core/PinnedArea";
import RecentArea from "./features/core/RecentArea";
import { DASHBOARD_ROUTES } from "./utils/useDashboardRoutes";

function App() {
  const {
    Notebooks,
    Notes,
    Overview,
    Pinned,
    Recent,
    Settings,
    Tagged,
    Untagged,
  } = DASHBOARD_ROUTES;
  return (
    <Router>
      <Routes>
        {/* This layout components is rendered on every page */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage redirect />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path={Overview} element={<DashboardArea />} />
            <Route path={Notes} element={<NotesArea />} />
            <Route path={Notebooks} element={<NotebooksArea />} />
            <Route path={Settings} element={<SettingsArea />} />
            <Route path={Tagged} element={<TaggedArea />} />
            <Route path={Untagged} element={<UntaggedArea />} />
            <Route path={Pinned} element={<PinnedArea />} />
            <Route path={Recent} element={<RecentArea />} />
          </Route>
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
