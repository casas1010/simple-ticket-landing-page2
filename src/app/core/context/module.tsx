// core/context/module_context.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import { Module } from '../../core/types/module';

type ModuleContextType = {
  module: Module | null;
  setModule: (module: Module | null) => void;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
};

export const ModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [module, setModule] = useState<Module | null>(null);

  return (
    <ModuleContext.Provider value={{ module, setModule }}>
      {children}
    </ModuleContext.Provider>
  );
};