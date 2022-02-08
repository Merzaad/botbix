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
    for (let i = 0; i < 5; i += 1) {
      const z = {
        id: `${i}`,
        title: `title${i}`,
        text: `text${i}`,
      }
      dispatch(addItem(z))
    }
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
        maxWidth: '80vh',
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
          color: 'rgb(200,200,200)',
          background: 'linear-gradient(90deg, rgba(168,0,105,0.25201834884344365) 0%, rgba(255,50,157,0.5433348754540879) 100%)',
        }}
      >
        add items
      </Button>
      <DraggableList items={items} onDragEnd={onDragEnd} />
    </Container>
  )
}

export default App
