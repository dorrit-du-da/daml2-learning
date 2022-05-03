import React, { forwardRef } from 'react'
import ListItem from '@mui/material/ListItem';
import { NavLink, NavLinkProps } from 'react-router-dom'

export interface AppMenuItemComponentProps {
  className?: string
  link?: string | null // because the InferProps props allows alows null value
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const AppMenuItemComponent: React.FC<AppMenuItemComponentProps> = props => {
  const { className, onClick, link, children } = props

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }
  if (typeof link === 'string' && onClick) {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
        component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props}  innerRef={ref}/>)}
        to={link}
      />
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props}  innerRef={ref}/>)}
      to={link}
    />
  )
}

// component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props}  innerRef={ref}/>)}

export default AppMenuItemComponent
