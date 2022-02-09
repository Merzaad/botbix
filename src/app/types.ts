import { OnDragEndResponder } from 'react-beautiful-dnd'

export type AudioPlayerIcons = {
  PlayIcon: any
  ReplayIcon: any
  PauseIcon: any
  VolumeUpIcon: any
  VolumeOffIcon: any
  CloseIcon: any
}
export interface BoxbitState {
  items: {
    id: string
    title: string
    text: string
    color: string
    game: string
  }[]
  result: boolean[]
}

export type DnDProps = {
  items: {
    id: string
    title: string
    text: string
    color: string
    game: string
  }[]
  onDragEnd: OnDragEndResponder
}

export type DragItem = {
  item: {
    id: string
    title: string
    text: string
    color: string
    game: string
  }
  index: number
}