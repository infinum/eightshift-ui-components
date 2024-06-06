import { arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx/lite';


export const getDragEndHandler = (onChange, items) => {
	return (event) => {
		const { active, over } = event;

		if (!active || !over) {
			return;
		}

		if (active?.id !== over?.id && items) {
			const mappedItems = items.map(({ id }) => id);
			const oldIndex = mappedItems?.indexOf(active.id) ?? -1;
			const newIndex = mappedItems?.indexOf(over.id) ?? -1;

			onChange(arrayMove([...items], oldIndex, newIndex));
		}
	};
};

export const getMultiValue = (ComponentToRender) => {
	return (props) => {
		const onMouseDown = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const innerProps = { ...props.innerProps, onMouseDown };

		const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
			id: props.data.id,
		});

		const style = {
			transform: CSS.Translate.toString(transform),
			transition,
		};

		return (
			<div
				style={style}
				ref={setNodeRef}
				className={clsx(
					'focus:es-uic-outline-none',
					// Make non-dragged tiles have no pointer events, so you don't see hover styles on things like the remove button.
					CSS.Translate.toString(transform) && '[&_>_div]:es-uic-pointer-events-none',
					// Make the currently grabbed item into a fancy holo-like thing.
					isDragging &&
						'es-uic-z-50 [&_>_div]:!es-uic-border [&_>_div]:es-uic-border-dotted [&_>_div]:!es-uic-border-teal-500 [&_>_div]:!es-uic-bg-teal-100/20 [&_>_div]:!es-uic-text-teal-900/15 [&_>_div_[role=button]]:es-uic-opacity-0 es-uic-blur-[0.5px]',
				)}
				{...attributes}
				{...listeners}
			>
				<ComponentToRender
					{...props}
					innerProps={innerProps}
				/>
			</div>
		);
	};
};

export const getMultiValueRemove = (ComponentToRender) => {
	return (props) => (
		<ComponentToRender
			{...props}
			innerProps={{
				onPointerDown: (e) => e.stopPropagation(),
				...props.innerProps,
			}}
		/>
	);
};
