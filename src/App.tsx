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
    for (let i = 0; i < 10; i += 1) {
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
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Container>
      <Container>
        <Container>{items.map((item: any) => item.text)}</Container>
      </Container>
      <Button onClick={addtest}>add items</Button>
    </Container>
  )
}

export default App
