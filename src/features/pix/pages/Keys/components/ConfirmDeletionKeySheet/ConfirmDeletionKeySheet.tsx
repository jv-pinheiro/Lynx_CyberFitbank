import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Button, ButtonWithFloatingIcon, PageContainer } from 'components'
import { Button as MuiButton } from '@material-ui/core'
import { PixData } from 'features/pix/redux/models/pixData'
import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useStyles } from './ConfirmDeletionKeySheet.style'
import confirmIcon from '_assets/icons/icn-confirm.svg'
import { Close } from '@material-ui/icons'
import { maskKeys } from 'features/pix/_utils/masks/maskKeys'

interface ConfirmDeletionKeySheetProps {
  open: boolean
  onClose: VoidFunction
  onConfirmDeletion: VoidFunction
}

export const ConfirmDeletionKeySheet: React.FC<
  ConfirmDeletionKeySheetProps
> = ({ open, onClose, onConfirmDeletion }) => {
  const styles = useStyles()
  const pixState = useSelector((state: StoreState) => state.pix)
  const { selectPix } = pixState
  const [pixData, setPixData] = React.useState<PixData>()

  React.useEffect(() => {
    setPixData(pixState.pix)
  }, [pixState])

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={onClose}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onClose}
                startIcon={<Close color="primary" />}
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item className={styles.text}>
                <Typography variant="h6" gutterBottom>
                  Excluir Chave
                </Typography>
                <Typography variant="h6" className={styles.subtitle}>
                  Deseja realmente apagar a chave
                </Typography>
                <Typography variant="h6">
                  {maskKeys(selectPix?.pixKeyValue!, selectPix?.pixKeyType!)}?
                </Typography>
              </Grid>

              <Grid item className={styles.buttonsRow}>
                <Grid container justify="center" spacing={4}>
                  <Grid item>
                    <MuiButton
                      variant="contained"
                      className={styles.buttonCancel}
                      onClick={onClose}
                      size={'medium'}
                    >
                      Cancelar
                    </MuiButton>
                  </Grid>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={confirmIcon}
                      onClick={onConfirmDeletion}
                      className={styles.deleteButton}
                    >
                      Excluir
                    </ButtonWithFloatingIcon>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
