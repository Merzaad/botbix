/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice'
import RecordBox from '../recordbox/recordbox'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  setIsActive, selectRecords, setSrc, resetSecond,
} from '../recordbox/recordboxSlice'
import { resetWidth, resetMargin } from '../dragbox/dragboxSlice'

export default function RecordMenu(props: { item: number, index: number }) {
  const dispatch = useAppDispatch()
  const { item, index } = props
  const records = useAppSelector(selectRecords)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    if (!records[item].src) {
      dispatch(setIsActive({ value: 0, target: item }))
      dispatch(setSrc({ value: undefined, target: item }))
      dispatch(resetWidth(index))
      dispatch(resetSecond(item))
      dispatch(resetMargin(index))
    }
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsVoiceIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{
            padding: '0px',
            margin: '0',
            height: '30px',
          }}
        >
          <RecordBox item={item} index={index} />
        </MenuItem>
      </Menu>
    </div>
  )
}
