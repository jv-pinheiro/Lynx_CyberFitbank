import React from 'react'
import { AppBar as MuiAppBar, Box, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import companyLogo from '_assets/img/helpsound.svg'
import helpLogo from '_assets/img/teleatendimento.svg'
import voltTemp from '_assets/img/Voltar.svg'
import { useStyles } from './AppBar.style'
import ReactPlayer from 'react-player'
import Audio from './Audios/pix.mp3';
interface AppBarProps {
  homeRoute: string
  action?: React.ReactNode
}

export const AppBar: React.FC<AppBarProps> = ({
  homeRoute,
  action,
  ...rest
}: AppBarProps) => {
  const style = useStyles()
  const history = useHistory()

  const onLogoClick = () => history.push(homeRoute)

  return (
    <MuiAppBar
      color="primary"
      elevation={0}
      position="relative"
      data-test-id="appbar"
      {...rest}
    >
      
      <Toolbar className={style.toolbar}>
        <Box className={style.logo}>
        <img
            src={voltTemp}
            onClick={onLogoClick}
            alt="logo"
            data-test-id="logo"
          />
         
          <img
           /* src={companyLogo}
            onClick={onLogoClick}
            alt="logo"
            data-test-id="logo"
          */
            />
          
        </Box>
        <Box className = {style.play}>
        <ReactPlayer
            url= {Audio}
            width="149px"
            height="45px"
            playing={false}
            controls={true}
          />
        </Box>
        <Box className = {style.test}>
        <img
            src={helpLogo}
            alt="logo"
            data-test-id="logo"
          />
        </Box>
        {action}
      </Toolbar>
    </MuiAppBar>
  )
}
