/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Container, Button } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import DraggableList from './features/boxbit/boxbit'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { selectItems, reorder, roll, reset } from './features/boxbit/boxbitSlice'

function App() {
  const items = useAppSelector(selectItems)
  const dispatch = useAppDispatch()
  const board = {
    reset: () => {
      dispatch(reset())
      dispatch(roll())
    },
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
        width: '800px',
        marginTop: '15vh',
        minHeight: '300px',
        borderRadius: '20px',
        boxShadow: '0px 0px 5px white',
        gap: '10px',
      }}
      id="appbg"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '20%',
        }}
      >
        <Button
          onClick={board.reset}
          sx={{
            color: 'rgb(37,255,159)',
            background: 'rgb(37,255,159,0.4)',
          }}
        >
          <CasinoOutlinedIcon />
        </Button>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '60%',
        }}
      >
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '20%',
        }}
      >
        <DisplaySettingsIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <QueueMusicIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <SportsEsportsOutlinedIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <PauseIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <PlayArrowIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
      </Container>
    </Container>
  )
}

export default App
