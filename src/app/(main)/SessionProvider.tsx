"use client";
import { Session, User } from "lucia";
import { createContext, useContext } from "react";

interface sessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<sessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: sessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error(
      "Oturum bağlamı bulunamadı. Oturum sağlayıcısının içinde kullanmalısınız.",
    );
  return context;
}
