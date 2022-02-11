/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Container, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { DragItem } from '../../app/types'
import RecordMenu from './dragboxitemMenu'
import { useAppDispatch } from '../../app/hooks'
import { addMargin, removeMargin } from './dragboxSlice'

function DraggableItems({ item, index }: DragItem) {
  const dispatch = useAppDispatch()
  const addTime = () => dispatch(addMargin(index))
  const removeTime = () => dispatch(removeMargin(index))

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: `${item.width}px`,
            background: `${item.color}`,
            height: '50px',
            borderRadius: '10px',
            marginLeft: `${item.margin}px`,
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <IconButton onClick={removeTime}>
            <ArrowBackIosIcon />
          </IconButton>
          {item.text !== 'initial' ? <RecordMenu item={item.id} /> : null}
          <IconButton onClick={addTime}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Container>
      )}
    </Draggable>
  )
}

export default DraggableItems
