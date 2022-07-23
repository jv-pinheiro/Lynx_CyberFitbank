import { Box } from '@material-ui/core'
import { styles } from '@material-ui/pickers/views/Calendar/Calendar'
import { ButtonWithFloatingIcon } from 'components'
import { PixRoutes } from 'features/pix/constants/routes'
import { GetInfoPixQRCode } from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { useStyles } from './CopyPasteCodeField.style'
import { CopyPasteCodeFieldView } from './CopyPasteCodeField.view'

const _copyPasteCodeValidLength = 156

export const CopyPasteCodeField: React.FC = () => {
  const [copyPasteCode, setCopyPasteCode] = React.useState('')
  const [disableNextButton, setDisableNextButton] = React.useState(true)
  const pixState = useSelector((state: StoreState) => state.pix)
  const { infosPixQRCode } = pixState
  const dispatch = useDispatch()
  const history = useHistory()

  const styles = useStyles()

  React.useEffect(() => {
    if (copyPasteCode.length >= 100) {
      setDisableNextButton(false)
    }
  }, [copyPasteCode])

  const onClick = () => {
    dispatch(GetInfoPixQRCode(copyPasteCode))
  }
  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && infosPixQRCode) {
      if (!pixState.infosPixQRCode?.originalValue) {
        history.push(PixRoutes.confirmQrCodeTransferValue)
      }
      if (!!pixState.infosPixQRCode?.originalValue) {
        history.push(PixRoutes.qrCodeTransferSummary)
      }
    }
  }, [pixState])

  const onCopyPasteCodeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCopyPasteCode(e.target.value)
    },
    [],
  )

  return (
    <Box>
      <CopyPasteCodeFieldView
        value={copyPasteCode}
        onChange={onCopyPasteCodeChange}
      />
      <Box className={styles.scheduleButtonContainer}>
        <ButtonWithFloatingIcon
          data-test-id="schedule-button"
          disabled={disableNextButton}
          onClick={onClick}
        >
          <span>Buscar</span>
        </ButtonWithFloatingIcon>
      </Box>
    </Box>
  )
}
