/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { DragItem } from '../../app/types'
import { useAppDispatch } from '../../app/hooks'
import { addMargin, removeMargin } from './dragboxSlice'

export function Testbutton(props: { target: number }) {
  const { target } = props
  const dispatch = useAppDispatch()
  const addTime = () => dispatch(addMargin(target))
  const removeTime = () => dispatch(removeMargin(target))
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: 'white',
        gap: '20px',
      }}
    >
      <ArrowBackIosIcon
        sx={{
          color: 'white',
        }}
        onClick={removeTime}
      />

      <ArrowForwardIosIcon
        sx={{
          color: 'white',
        }}
        onClick={addTime}
      />
    </Container>
  )
}

function DraggableItems({ item, index }: DragItem) {
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
            height: '35px',
            borderRadius: '10px',
            marginLeft: `${item.margin}px`,
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {item.text !== 'initial' ? <Testbutton target={index} /> : null}
        </Container>
      )}
    </Draggable>
  )
}

export default DraggableItems
