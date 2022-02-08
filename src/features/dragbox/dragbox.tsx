/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'
import DraggableItems from './dragitem'

export type DnDProps = {
  items: {
    id: string
    title: string
    text: string
    color: string
    game: string
  }[]
  onDragEnd: OnDragEndResponder
}

const DnD = React.memo(({ items, onDragEnd }: DnDProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <DraggableItems item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
))

export default DnD
