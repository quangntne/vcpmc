import RecordGalleryEntity from "@modules/recordGallery/entity";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListRecordGallery = (props) => {
  const { record, newList, handleDeleteRecord } = props;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",


    // change background colour if dragging
    background: isDragging ? "#33334D" : "#2F2F41",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  if (record) {
    return record.map((item: RecordGalleryEntity, index) => {
      return (
        <Draggable key={item.mediaId} draggableId={item.mediaId} index={index}>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="record__th"
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {item.mediaName}
                {newList == true? (
                    <a className="" onClick={() =>{handleDeleteRecord(index, true)}}>Gỡ</a>
                  ):(
                    <a className="" onClick={() =>{handleDeleteRecord(index, false)}}>Thêm</a>
                  )
                }
              </div>
            );
          }}
        </Draggable>
      );
    });
  }
  return "";
};

export default ListRecordGallery;
