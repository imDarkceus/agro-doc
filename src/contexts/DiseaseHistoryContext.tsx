"use client";

import type { DiseaseEntry } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DiseaseHistoryContextType {
  history: DiseaseEntry[];
  addDiagnosis: (entry: Omit<DiseaseEntry, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

const DiseaseHistoryContext = createContext<DiseaseHistoryContextType | undefined>(undefined);

export const DiseaseHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<DiseaseEntry[]>([]);

  const addDiagnosis = useCallback((entry: Omit<DiseaseEntry, 'id' | 'date'>) => {
    const newEntry: DiseaseEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substring(2,9), // Simple unique ID
      date: new Date().toISOString(),
    };
    setHistory(prevHistory => [newEntry, ...prevHistory].slice(0, 20)); // Keep last 20 entries
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <DiseaseHistoryContext.Provider value={{ history, addDiagnosis, clearHistory }}>
      {children}
    </DiseaseHistoryContext.Provider>
  );
};

export const useDiseaseHistory = () => {
  const context = useContext(DiseaseHistoryContext);
  if (context === undefined) {
    throw new Error('useDiseaseHistory must be used within a DiseaseHistoryProvider');
  }
  return context;
};
