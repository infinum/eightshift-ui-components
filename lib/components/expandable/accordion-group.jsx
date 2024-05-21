import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useAccordion } from '@react-aria/accordion';
import { useTreeState } from '@react-stately/tree';

import { AccordionContext } from './accordion-context';
import AccordionItem from './accordion-item';

const AccordionGroup = forwardRef((props, ref) => {
	const state = useTreeState(props);
	const accordionRef = useRef();
	const { accordionProps } = useAccordion(props, state, accordionRef);

	useImperativeHandle(ref, () => accordionRef.current);

	return (
		<AccordionContext.Provider value={state}>
			<div
				ref={accordionRef}
				{...accordionProps}
				{...props}
			>
				{Array.from(state.collection).map((item) => (
					<AccordionItem
						key={item.key}
						item={item}
					>
						{item.props.children}
					</AccordionItem>
				))}
			</div>
		</AccordionContext.Provider>
	);
});

AccordionGroup.displayName = 'AccordionGroup';

export default AccordionGroup;
