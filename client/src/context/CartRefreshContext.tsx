"use client";
import { createContext, useContext, useState } from "react";

type CartRefreshContextType = {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  doneRefresh: () => void;
};

const CartRefreshContext = createContext<CartRefreshContextType | undefined>(undefined);

export const useCartRefresh = () => {
  const context = useContext(CartRefreshContext);
  if (!context) {
    throw new Error("useCartRefresh must be used inside CartRefreshProvider");
  }
  return context;
};

export const CartRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const triggerRefresh = () => setShouldRefresh(true);
  const doneRefresh = () => setShouldRefresh(false);

  return (
    <CartRefreshContext.Provider value={{ shouldRefresh, triggerRefresh, doneRefresh }}>
      {children}
    </CartRefreshContext.Provider>
  );
};
