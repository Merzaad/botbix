/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Container, Button } from '@mui/material'
import DraggableList from './features/boxbit/boxbit'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { selectItems, reorder, addItem } from './features/boxbit/boxbitSlice'

function App() {
  const items = useAppSelector(selectItems)
  const dispatch = useAppDispatch()
  const addtest = () => {
    if (items.length === 5) return null
    for (let i = 0; i < 5; i += 1) {
      const z = {
        id: `${i}`,
        title: `title${i}`,
        text: `text${i}`,
      }
      dispatch(addItem(z))
    }
    return null
  }
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return
    dispatch(
      reorder({
        destination: destination.index,
        source: source.index,
      }),
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '700px',
        marginTop: '15vh',
        minHeight: '300px',
        borderRadius: '20px',
        boxShadow: '0px 0px 5px white',
      }}
      id="appbg"
    >
      <Button
        onClick={addtest}
        sx={{
          color: 'rgb(83,255,179,0.7)',
          background:
            'linear-gradient(90deg, rgba(83,255,179,0.2) 0%, rgba(0,0,0,0.1) 100%)',
          boxShadow: '0px 0px 3px rgb(83,255,179)',
          textShadow: '0px 0px 3px rgb(83,255,179)',
        }}
      >
        ~
      </Button>
      <DraggableList items={items} onDragEnd={onDragEnd} />
    </Container>
  )
}

export default App
