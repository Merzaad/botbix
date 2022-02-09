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
  records: {
    id: string
    title: string
    text: string
    color: string
    game: string
    width: string
    margin: number
  }[]
  result: boolean[]
}

export type DnDProps = {
  records: {
    id: string
    title: string
    text: string
    color: string
    game: string
    width: string
    margin: number
  }[]
  onDragEnd: OnDragEndResponder
}

export type DragItem = {
  record: {
    id: string
    title: string
    text: string
    color: string
    game: string
    width: string
    margin: number
  }
  index: number
}

export interface SoundboxState {
  record: {
    second: number
    minute: number
    isActive: number
    counter: number
  }
}
