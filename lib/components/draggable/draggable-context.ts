import { createContext, type Ref } from 'react';

type DraggableStatus = 'idle' | 'dragging' | 'sorting' | null;

export type DraggableContextValue = {
	handleRef: Ref<HTMLDivElement> | null;
	isDragSource: boolean;
	status: DraggableStatus;
};

export const DraggableContext = createContext<DraggableContextValue>({
	handleRef: null,
	isDragSource: false,
	status: null,
});
