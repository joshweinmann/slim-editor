import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import type { SidebarState } from "@type/types";

interface UserInterfaceState {
  sidebarState: SidebarState;
  setSidebarState: Dispatch<SetStateAction<SidebarState>>;
}

interface UserInterfaceContextProviderProps {
  children: React.ReactNode;
}

const UserInterfaceContext = createContext<UserInterfaceState | undefined>(
  undefined
);

export function UserInterfaceContextProvider({
  children,
}: UserInterfaceContextProviderProps) {
  const [sidebarState, setSidebarState] = useState<SidebarState>("tree");

  return (
    <UserInterfaceContext.Provider
      value={{
        sidebarState,
        setSidebarState,
      }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
}

export function useUserInterfaceContext() {
  const context = useContext(UserInterfaceContext);

  if (context === undefined) {
    throw new Error(
      "useUserInterfaceContext must be used within a UserInterfaceContextProvider"
    );
  }

  return context;
}
