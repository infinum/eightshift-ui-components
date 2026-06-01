import { createContext, type Dispatch, type SetStateAction } from 'react';

export type RepeaterOpenItems = Record<number, boolean>;

export type RepeaterContextValue = {
	deleteItem: () => void;
	duplicateItem: () => void;
	isDragged?: boolean;
	isOutOfBounds?: boolean;
	isSelected?: boolean;
	canDelete: boolean;
	canAdd: boolean;
	allOpen: boolean;
	setAllOpen: Dispatch<SetStateAction<boolean>>;
	setOpenItems: Dispatch<SetStateAction<RepeaterOpenItems>>;
	isItemOpen: boolean;
	index: number;
	noDuplicateButton?: boolean;
	[key: string]: unknown;
};

export const RepeaterContext = createContext<RepeaterContextValue | null>(null);
