/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Container, Button } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'
import RepeatOnOutlinedIcon from '@mui/icons-material/RepeatOnOutlined'
import RepeatOneOnOutlinedIcon from '@mui/icons-material/RepeatOneOnOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import VideogameAssetTwoToneIcon from '@mui/icons-material/VideogameAssetTwoTone'
import SportsSoccerTwoToneIcon from '@mui/icons-material/SportsSoccerTwoTone'
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone'
import ToysTwoToneIcon from '@mui/icons-material/ToysTwoTone'
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone'
import DnD from './features/dragbox/dragbox'
import { useAppSelector, useAppDispatch } from './app/hooks'
import {
  selectItems, selectResult, reorder, rollDrag, resetWidth, toggleRepeatPLay, selectRepeatPlay,
} from './features/dragbox/dragboxSlice'
import { selectRecords, rollSound } from './features/recordbox/recordboxSlice'

function App() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectItems)
  const result = useAppSelector(selectResult)
  const repeatPlay = useAppSelector(selectRepeatPlay)
  const records = useAppSelector(selectRecords)
  const notWon = localStorage.getItem('gameResult')?.split(',').includes('false')
  const resetHandler = () => {
    items.forEach((i) => dispatch(resetWidth(i.id)))
    dispatch(rollDrag())
    dispatch(rollSound())
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
  const playAll = () => {
    items.forEach((x) => {
      if (records[x.id].src) {
        const audio = new Audio(records[x.id].src)
        const timeout = x.margin * 10
        setTimeout(() => audio.play(), timeout)
      }
    })
  }
  const reapeat = () => {
    dispatch(toggleRepeatPLay())
  }
  React.useEffect(() => {
    const repeat = setInterval(() => {
      if (repeatPlay) playAll()
    }, 2000)
    return () => clearInterval(repeat)
  }, [repeatPlay])
  return (
    <Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '800px',
          marginTop: '10vh',
          minHeight: '400px',
          borderRadius: '20px',
          gap: '10px',
          background: `${
            notWon
              ? 'linear-gradient(90deg, rgba(50,50,50,0.9) 0%, rgba(50,50,50,0.9) 100%)'
              : 'linear-gradient(90deg, rgba(48, 100, 92, 0.5) 0%, rgba(48, 200, 134, 0.2) 100%)'
          }`,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '20%',
          }}
        >
          <Button
            onClick={resetHandler}
            sx={{
              color: `${notWon ? 'white' : 'mediumspringgreen'}`,
            }}
          >
            <CasinoOutlinedIcon fontSize="large" />
          </Button>
          <Button
            onClick={reapeat}
            sx={{
              color: `${notWon ? 'white' : 'mediumspringgreen'}`,
            }}
          >
            {repeatPlay ? <PauseIcon fontSize="large" /> : <RepeatOnOutlinedIcon fontSize="large" /> }
          </Button>
          <Button
            onClick={playAll}
            sx={{
              color: `${notWon ? 'white' : 'mediumspringgreen'}`,
            }}
          >
            <RepeatOneOnOutlinedIcon fontSize="large" />
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
          <SportsSoccerTwoToneIcon
            fontSize="large"
            sx={{
              color: `${color(0)}`,
            }}
          />
          <VideogameAssetTwoToneIcon
            fontSize="large"
            sx={{
              color: `${color(1)}`,
            }}
          />
          <SportsEsportsTwoToneIcon
            fontSize="large"
            sx={{
              color: `${color(2)}`,
            }}
          />
          <ExtensionTwoToneIcon
            fontSize="large"
            sx={{
              color: `${color(3)}`,
            }}
          />
          <ToysTwoToneIcon
            fontSize="large"
            sx={{
              color: `${color(4)}`,
            }}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default App
