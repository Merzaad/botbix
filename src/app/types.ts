export interface RecorderSlice {
  bars: {
    id: number
    title: string
    menu: boolean
    color: string
    width: number
    margin: number
    src: string
    repeat: boolean
}[]
selectedBarId: number | null
recording: boolean
playing: boolean
moving: boolean
}
