/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Container } from '@mui/material'

import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  draggingItem: {
    background: 'rgb(235,235,235)',
    borderRadius: '10px',
  },
})

export type DragItem = {
  item: {
    id: string,
    title: string,
    text: string,
  }
  index: number
}

function DraggableListItem({ item, index }: DragItem) {
  const classes = useStyles()
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingItem : ''}
          sx={{
            width: `${Number(item.id) * 100}px`,
            background: 'rgb(0,235,235)',
            height: '40px',
            borderRadius: '10px',
            margin: '10px',
          }}
        >
          s
        </Container>
      )}
    </Draggable>
  )
}

export default DraggableListItem
