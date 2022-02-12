import { OnDragEndResponder } from 'react-beautiful-dnd'

export type AudioPlayerIcons = {
  PlayIcon: any
  ReplayIcon: any
  PauseIcon: any
  VolumeUpIcon: any
  VolumeOffIcon: any
  CloseIcon: any
}
export interface DragboxSlice {
  items: {
    id: number
    title: string
    text: string
    color: string
    game: string
    width: number
    margin: number
  }[]
  result: boolean[]
  reapeatPlay: boolean
}

export type DnDProps = {
  items: {
    id: number
    title: string
    text: string
    color: string
    game: string
    width: number
    margin: number
  }[]
  onDragEnd: OnDragEndResponder
}

export type DragItem = {
  item: {
    id: number
    title: string
    text: string
    color: string
    game: string
    width: number
    margin: number
  }
  index: number
}

export interface RecordboxState {
  records: {
    id: number
    second: number
    isActive: number
    counter: number
    src: string | undefined
  }[]
}
