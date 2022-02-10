/* eslint-disable linebreak-style */
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
import DnD from './features/dragbox/dragbox'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { selectItems, selectResult, reorder, roll, reset } from './features/dragbox/dragboxSlice'
import SoundBox from './features/soundbox/soundbox'

function App() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectItems)
  const result = useAppSelector(selectResult)
  const notWon = localStorage.getItem('gameResult')?.split(',').includes('false')
  const resetHandler = () => {
    dispatch(reset())
    dispatch(roll())
  }
  const color = (x: number) => (result[x] === true ? items[x].color : 'white')
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return
    const x: { destination: number; source: number } = {
      destination: destination.index,
      source: source.index,
    }
    dispatch(reorder(x))
  }

  return (
    <Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '800px',
          marginTop: '5vh',
          minHeight: '300px',
          borderRadius: '20px',
          gap: '10px',
          background: `${
            notWon
              ? `linear-gradient(90deg, rgba(0, 255, 191, 0.1) 0%,
              rgba(113, 238, 255, 0.1) 100%)`
              : 'linear-gradient(90deg, rgba(130, 255, 92, 0.1) 0%, rgba(48, 255, 134, 0.1) 100%)'
          }`,
        }}
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
            onClick={resetHandler}
            sx={{
              color: `${notWon ? 'white' : 'mediumspringgreen'}`,
            }}
          >
            <CasinoOutlinedIcon />
          </Button>
        </Container>
        <DnD items={items} onDragEnd={onDragEnd} />
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
              color: `${color(0)}`,
            }}
          />
          <QueueMusicIcon
            fontSize="large"
            sx={{
              color: `${color(1)}`,
            }}
          />
          <SportsEsportsOutlinedIcon
            fontSize="large"
            sx={{
              color: `${color(2)}`,
            }}
          />
          <PauseIcon
            fontSize="large"
            sx={{
              color: `${color(3)}`,
            }}
          />
          <PlayArrowIcon
            fontSize="large"
            sx={{
              color: `${color(4)}`,
            }}
          />
        </Container>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '800px',
          marginTop: '5vh',
          minHeight: '100px',
          borderRadius: '10px',
          boxShadow: 'mediumspringgreen',
          padding: '0px',
        }}
        id="appbg"
      >
        <SoundBox />
        <SoundBox />
      </Container>
    </Container>
  )
}

export default App
