/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import DraggableListItem from './boxItems'

export type DraggableListProps = {
  items: {
    id: string
    title: string
    text: string
  }[]
  onDragEnd: OnDragEndResponder
}

const DraggableList = React.memo(({ items, onDragEnd }: DraggableListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <DraggableListItem item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
))

export default DraggableList
