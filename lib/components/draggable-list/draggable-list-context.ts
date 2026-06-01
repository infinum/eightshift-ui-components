import { createContext } from 'react';

export const DraggableListContext = createContext<Record<string, never> | null>(null);
