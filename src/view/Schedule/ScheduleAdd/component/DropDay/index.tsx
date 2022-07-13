import React, { useEffect, useState } from 'react';
import { DropTargetMonitor, useDrop, DragSource } from 'react-dnd';

const DropDay = (props) => {
	const { handleOnDrop } = props;

	const [, drop] = useDrop(
		() => ({
			accept: ['Top USUK', 'Love Songs', 'Loving You', 'Summer Party'],
			drop(_item: any, monitor) {
				handleOnDrop && handleOnDrop(_item);
				return _item;
			},
			collect: (monitor: DropTargetMonitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
				draggingColor: monitor.getItemType() as string,
			}),
		}),
		[handleOnDrop]
	);

	return (
		<div className="wrap-weekend-item w-100" ref={drop} role="TargetBox">
			{props.children}
		</div>
	);
};

export default DropDay;
