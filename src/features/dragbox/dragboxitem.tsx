/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Container } from '@mui/material'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { DragItem } from '../../app/types'

const useStyles = makeStyles({
  draggingItem: {
    background: 'rgb(146,255,207,0.5)',
    borderRadius: '10px',
    borderColor: 'red',
    boxShadow: '0px 0px 20px (255,255,230)',
  },
})

function DraggableItems({ item, index }: DragItem) {
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
            width: `${Number(item.id) * 20}%`,
            background: `${item.color}`,
            height: '35px',
            borderRadius: '10px',
            marginLeft: '0px',
            marginBottom: '10px',
          }}
        >
          {' '}
        </Container>
      )}
    </Draggable>
  )
}

export default DraggableItems
