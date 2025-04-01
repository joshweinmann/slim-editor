import { useCallback, useEffect } from "react";
import { useEditorContext } from "@context/EditorContext";
import { useUserInterfaceContext } from "@context/UserInterfaceContext";

import type { SidebarState } from "@type/types";

export function useGlobalKeymaps() {
  const { setOpenedFileIndex, openedFiles, saveCurrentFile } = useEditorContext();
  const { sidebarState, setSidebarState } = useUserInterfaceContext();

  const toggleSidebar = useCallback((key: SidebarState) => {
    setSidebarState((prev) => prev === key ? "none" : key);
  }, [setSidebarState]);

  const handlePrevTab = useCallback(() => {
    if (openedFiles.length > 0) {
      setOpenedFileIndex((prev) => {
        if (prev === undefined) {
          return undefined;
        } else if (prev === 0) {
          return openedFiles.length - 1;
        }
        
        return prev - 1;
      });
    }
  }, [openedFiles, setOpenedFileIndex]);

  const handleNextTab = useCallback(() => {
    if (openedFiles.length > 0) {
      setOpenedFileIndex((prev) => {
        if (prev === undefined) {
          return undefined;
        } else if (prev === openedFiles.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }
  }, [openedFiles, setOpenedFileIndex]);
  
  // global keydown event listener
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();

      if (!event.metaKey) {
        return;
      }

      if (event.altKey) {
        switch (event.key) {
          // previous tab
          case "ArrowLeft": {
            handlePrevTab();
            break;
          }
          // next tab
          case "ArrowRight": {
            handleNextTab();
            break;
          }
        }
      } else {
        switch (event.key) {
          // toggle file tree sidebar
          case "e": {
            toggleSidebar("tree");
            break;
          }
          // toggle search sidebar
          case "f": {
            toggleSidebar("search");
            break;
          }
          // toggle git sidebar
          case "g": {
            toggleSidebar("git");
            break;
          }
          // toggle terminal sidebar
          case "t": {
            toggleSidebar("terminal");
            break;
          }
          // toggle settings sidebar
          case ",": {
            toggleSidebar("settings");
            break;
          }
          // save file
          case "s": {
            saveCurrentFile();
            break;
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarState, openedFiles, handlePrevTab, handleNextTab, toggleSidebar]);
}