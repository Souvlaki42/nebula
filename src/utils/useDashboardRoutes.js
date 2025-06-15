import { useNavigate } from "react-router-dom";

export const DASHBOARD_ROUTES = {
  Overview: "/dashboard",
  Notes: "/dashboard/notes",
  Notebooks: "/dashboard/notebooks",
  Settings: "/dashboard/settings",
  Tagged: "/dashboard/tagged",
  Untagged: "/dashboard/untagged",
  Pinned: "/dashboard/pinned",
  Recent: "/dashboard/recent",
};

export const useDashBoardRoutes = () => {
  const navigate = useNavigate();

  const goToDashboard = () => navigate(DASHBOARD_ROUTES.Overview);
  const goToNotes = () => navigate(DASHBOARD_ROUTES.Notes);
  const goToNotebooks = () => navigate(DASHBOARD_ROUTES.Notebooks);
  const goToSettings = () => navigate(DASHBOARD_ROUTES.Settings);
  const goToPinned = () => navigate(DASHBOARD_ROUTES.Pinned);
  const goToRecent = () => navigate(DASHBOARD_ROUTES.Recent);
  const goToTagged = () => navigate(DASHBOARD_ROUTES.Tagged);
  const goToUntagged = () => navigate(DASHBOARD_ROUTES.Untagged);

  return {
    goToDashboard,
    goToNotes,
    goToNotebooks,
    goToSettings,
    goToPinned,
    goToRecent,
    goToTagged,
    goToUntagged,
  };
};
