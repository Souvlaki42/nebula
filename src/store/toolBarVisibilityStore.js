import { create } from "zustand";

export const useToolBarVisibilityStore = create(function (set) {
  return {
    toolBarVisible:
      (localStorage.getItem("toolbar_visibility") ?? "true") === "true",
    setToolBarVisible: function (newVisibilityStatus) {
      set({ toolBarVisible: newVisibilityStatus });
      localStorage.setItem("toolbar_visibility", newVisibilityStatus);
    },
  };
});
