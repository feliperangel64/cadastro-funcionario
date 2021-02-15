import React from 'react'
import { Link, Typography } from '@material-ui/core'

export default function FooterCustom() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Enterprise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
