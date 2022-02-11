/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Container } from '@mui/material'
import DraggableItems from './dragboxitem'
import { DnDProps } from '../../app/types'

const DnD = React.memo(({ items, onDragEnd }: DnDProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            gap: '10px',
          }}
        >
          {items.map((item, index) => (
            <DraggableItems item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  </DragDropContext>
))

export default DnD
