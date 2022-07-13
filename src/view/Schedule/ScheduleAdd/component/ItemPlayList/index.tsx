import React from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";

const ItemPlayList = props => {
    const {index, name, time, id} = props;
    const [{isDragging}, drag] = useDrag(() => ({
            type: name,
            item: props,
            canDrag: true,
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [name])
    return(
        <div ref={drag} className="wrap-item " key={index} role="SourceBox">
            <label htmlFor="name" className="item-name">{name}</label>
            <div className="d-flex justify-content-between">
                <span className="item-label-time">Thời lượng</span>
                <span className="item-time">{time}</span>
            </div>
        </div>
    )
};

export default ItemPlayList