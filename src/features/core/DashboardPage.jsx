import {
  ArrowLeft,
  Book,
  BookPlus,
  Clock,
  File,
  FilePlus,
  LayoutPanelTop,
  Pin,
  Settings,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import UntaggedIcon from "../../assets/UntaggedIcon";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import {
  getAllNotebooks,
  getAllNotes,
  getAuthenticatedUser,
  getUserData,
} from "../../firebase/services";
import { useMessageStore } from "../../store/messageStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNotesStore } from "../../store/notesStore";
import { useQuoteStore } from "../../store/quoteStore";
import { useUserStore } from "../../store/userStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import fetchAllQuotes from "../../utils/fetchAllQuotes";
import CreateNoteModal from "../components/CreateNoteModal";
import CreateNotebookModal from "../components/CreateNotebookModal";
import EditNoteModal from "../components/EditNoteModal";
import EditNotebookModal from "../components/EditNotebookModal";
import GenericModal from "../components/GenericModal";
import { SideBarButton } from "../components/SidebarButton";
import { useDashBoardRoutes } from "../../utils/useDashboardRoutes";

function DashboardPage() {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();
  const { setNotebooks } = useNotebooksStore();
  const { setNotes } = useNotesStore();
  const { message } = useMessageStore();
  const { setQuotes } = useQuoteStore();
  const {
    goToDashboard,
    goToNotebooks,
    goToNotes,
    goToPinned,
    goToRecent,
    goToSettings,
    goToTagged,
    goToUntagged,
  } = useDashBoardRoutes();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  function handleCollapse() {
    setSideBarCollapsed(!sideBarCollapsed);
  }

  function showNewNoteModal() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
    goToNotes();
  }

  function showNewNotebookModal() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  }

  useHotkeys(`ctrl+shift+${user?.shortcuts.DASHBOARD_PAGE}`, goToDashboard, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`ctrl+shift+${user?.shortcuts.NOTES_PAGE}`, goToNotes, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`ctrl+shift+${user?.shortcuts.NOTEBOOKS_PAGE}`, goToNotebooks, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`ctrl+shift+${user?.shortcuts.SETTINGS_PAGE}`, goToSettings, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`shift+${user?.shortcuts.PINNED_PAGE}`, goToPinned, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`shift+${user?.shortcuts.RECENT_PAGE}`, goToRecent, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`shift+${user?.shortcuts.TAGGED_PAGE}`, goToTagged, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(`shift+${user?.shortcuts.UNTAGGED_PAGE}`, goToUntagged, {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys(
    `shift+${user?.shortcuts.NEW_NOTE}`,
    () => {
      if (!userVerified) return;
      document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
    },
    {
      preventDefault: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.NEW_NOTE_BOOK}`,
    () => {
      if (!userVerified) return;
      document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
    },
    {
      preventDefault: true,
    },
  );

  useEffect(() => {
    getAuthenticatedUser().then((user) => {
      if (user == APP_CONSTANTS.UNAUTHENTICATED) {
        navigate("/login");
      } else {
        setUserVerified(user.emailVerified);
        return;
      }
    });
  }, [navigate, setUserVerified]);

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData == null) {
        // Handle this error later
      } else {
        setUser(userData);
      }
    });
  }, [setUser]);

  useEffect(() => {
    getAllNotebooks().then((notebooksSnapshot) => {
      const allNotebooksData = [];
      notebooksSnapshot.forEach((notebook) => {
        if (notebook.data().deleted == null) {
          allNotebooksData.push({ ...notebook.data(), id: notebook.id });
        }
      });
      setNotebooks(allNotebooksData);
    });
  }, [setNotebooks]);

  useEffect(() => {
    getAllNotes().then((notesSnapshot) => {
      const allNotesData = [];
      notesSnapshot.forEach((note) => {
        if (note.data().deleted == null) {
          allNotesData.push({ ...note.data(), id: note.id });
        }
      });
      setNotes(allNotesData);
    });
  }, [setNotes]);

  useEffect(() => {
    fetchAllQuotes().then((response) => {
      response.json().then((quotesArray) => {
        setQuotes(quotesArray);
      });
    });
  }, [setQuotes]);

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute(
      "data-theme",
      user?.preferences.theme ?? localStorage.getItem("theme"),
    );
  }, [user?.preferences.theme]);

  return (
    <div className="flex font-jakarta">
      <CreateNoteModal></CreateNoteModal>
      <CreateNotebookModal></CreateNotebookModal>
      <GenericModal
        id={APP_CONSTANTS.GENERIC_MODAL}
        title={message.title}
        textContent={message.textContent}
        firstButtonClassName={message.firstButtonClassName}
        secondButtonClassName={message.secondButtonClassName}
        firstButtonOnClick={message.firstButtonOnClick}
        secondButtonOnClick={message.secondButtonOnClick}
        firstButtonText={message.firstButtonText}
        secondButtonText={message.secondButtonText}
      ></GenericModal>
      <EditNoteModal></EditNoteModal>
      <EditNotebookModal></EditNotebookModal>
      <div
        className={
          "sideBar h-[100vh] bg-base-300 py-4 flex flex-col ease-in-out duration-200" +
          (sideBarCollapsed ? " w-20" : " w-60")
        }
      >
        <div className="logo flex items-center justify-between px-4">
          <Link to={"/home"}>
            <h1
              className={
                "flex items-center gap-2 text-xl font-jakarta font-bold text-center" +
                (sideBarCollapsed ? " hidden" : "")
              }
            >
              <Logo />
              Nebula
            </h1>
          </Link>
          <button
            className={
              "btn btn-square bg-transparent" +
              (sideBarCollapsed ? " btn-wide rotate-180" : "")
            }
            onClick={handleCollapse}
          >
            <ArrowLeft></ArrowLeft>
          </button>
        </div>
        <div className="divider"></div>
        <div className="mainButtons flex-1 px-4">
          <SideBarButton
            icon={FilePlus}
            label="New note"
            onClick={showNewNoteModal}
            isDisabled={!userVerified}
            sideBarCollapsed={sideBarCollapsed}
          />
          <SideBarButton
            icon={BookPlus}
            label="New notebook"
            onClick={showNewNotebookModal}
            isDisabled={!userVerified}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />

          <div className="divider" />

          <SideBarButton
            icon={LayoutPanelTop}
            label="Dashboard"
            onClick={goToDashboard}
            // isActive={activeTab === APP_CONSTANTS.DASHBOARD_PAGE}
            sideBarCollapsed={sideBarCollapsed}
          />

          <SideBarButton
            icon={File}
            label="Notes"
            onClick={goToNotes}
            // isActive={activeTab === APP_CONSTANTS.NOTES_PAGE}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />
          <SideBarButton
            icon={Book}
            label="Notebooks"
            onClick={goToNotebooks}
            // isActive={activeTab === APP_CONSTANTS.NOTEBOOKS_PAGE}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />

          <div className="divider" />

          <SideBarButton
            icon={Pin}
            label="Pinned"
            onClick={goToPinned}
            // isActive={activeTab === APP_CONSTANTS.PINNED_ITEMS}
            sideBarCollapsed={sideBarCollapsed}
          />
          <SideBarButton
            icon={Clock}
            label="Recent"
            onClick={goToRecent}
            // isActive={activeTab === APP_CONSTANTS.RECENT_ITEMS}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />
          <SideBarButton
            icon={Tag}
            label="Tagged"
            onClick={goToTagged}
            // isActive={activeTab === APP_CONSTANTS.TAGGED_ITEMS}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />
          <SideBarButton
            icon={UntaggedIcon}
            label="Untagged"
            onClick={goToUntagged}
            // isActive={activeTab === APP_CONSTANTS.UNTAGGED_ITEMS}
            sideBarCollapsed={sideBarCollapsed}
            addTopMargin
          />
        </div>

        <div className="bottomButtons flex flex-col justify-between px-4">
          <div className="divider" />
          <SideBarButton
            icon={Settings}
            label="Settings"
            onClick={goToSettings}
            // isActive={activeTab === APP_CONSTANTS.SETTINGS_PAGE}
            sideBarCollapsed={sideBarCollapsed}
          />
        </div>
      </div>
      <div className="divider divider-horizontal m-0"></div>
      <Outlet />
    </div>
  );
}

export default DashboardPage;
