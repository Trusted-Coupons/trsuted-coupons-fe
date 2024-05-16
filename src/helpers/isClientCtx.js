'use client';
import { createContext, useContext, useEffect, useState } from 'react';

// this component is used to prevet a window not defined & hydration error in next.js
// for further explenation check out https://stackoverflow.com/questions/75692116/next-js-13-window-is-not-defined

const IsClientCtx = createContext(false);

export const IsClientCtxProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>;
};

export function useIsClient() {
  return useContext(IsClientCtx);
}
