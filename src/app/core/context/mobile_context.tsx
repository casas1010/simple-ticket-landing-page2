// context/MobileContext.tsx
'use client';

import { createContext, useContext } from 'react';

const MobileContext = createContext<boolean>(false);

export const useIsMobile = () => useContext(MobileContext);

export const MobileProvider = ({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile: boolean;
}) => {
  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};