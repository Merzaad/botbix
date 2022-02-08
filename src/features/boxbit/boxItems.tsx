/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import makeStyles from '@material-ui/core/styles/makeStyles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import AbcIcon from '@mui/icons-material/Abc'

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)',
  },
})

export type DraggableListItemProps = {
  item: {
    id: string
    title: string
    text: string
  }
  index: number
}

function DraggableListItem({ item, index }: DraggableListItemProps) {
  const classes = useStyles()
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemAvatar>
            <Avatar>
              <AbcIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.title} secondary={item.text} />
        </ListItem>
      )}
    </Draggable>
  )
}

export default DraggableListItem
