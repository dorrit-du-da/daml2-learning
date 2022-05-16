import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles } from '@mui/styles';

import List from '@mui/material/List'

import ListItemIcon from '@mui/material//ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import AppMenuItemComponent from './AppMenuItemComponent'

// React runtime PropTypes
export const AppMenuItemProp = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
}

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemProp>
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[]
}

const AppMenuItem: React.FC<AppMenuItemProps> = props => {
  const { name, link, Icon, items = [] } = props
  const classes = useStyles()
  const isExpandable = items && items.length > 0
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  const MenuItemRoot = (
    <AppMenuItemComponent className={classes.menuItem} link={link} onClick={handleClick}>
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon >
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={name} inset={!Icon} />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <ExpandMoreIcon />}
      {isExpandable && open && <ExpandLessIcon />}
    </AppMenuItemComponent>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider variant="middle" className={classes.divider}/>
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      '& .MuiListItemIcon-root': {
        color: "#fbcd14",
      },
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
        '& .MuiListItemIcon-root': {
          color: '#fff',
        },
      },
    },
    divider: {
      background: 'white',
    },
  }),
)

export default AppMenuItem
