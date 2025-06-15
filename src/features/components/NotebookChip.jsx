import { Book } from "lucide-react";
import { memo } from "react";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useDashBoardRoutes } from "../../utils/useDashboardRoutes";

const MemoizedBook = memo(Book);

function NotebookChip({ bookIcon, notebookName, source }) {
  const { goToNotes } = useDashBoardRoutes();
  const { setNotesView } = useCurrentNotesViewStore();
  const { setNoteSearchTerm } = useNoteSearchTermStore();

  function handleNotebookChipClick(e) {
    e.stopPropagation();

    if (source == APP_CONSTANTS.VIEW_NOTE_EDITOR) {
      setNotesView(APP_CONSTANTS.VIEW_GRID);
    }

    setNoteSearchTerm("book: " + notebookName);
    goToNotes();
  }

  return (
    <div
      className="btn bg-base-200 text-secondary flex gap-2 items-center max-w-full"
      onClick={handleNotebookChipClick}
    >
      {bookIcon ? (
        <MemoizedBook size={20} className="flex-shrink-0"></MemoizedBook>
      ) : (
        ""
      )}
      <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
        {notebookName}
      </span>
    </div>
  );
}

export default NotebookChip;
