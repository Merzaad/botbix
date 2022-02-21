export interface RecorderSlice {
  bars: {
    id: number
    title: string
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
