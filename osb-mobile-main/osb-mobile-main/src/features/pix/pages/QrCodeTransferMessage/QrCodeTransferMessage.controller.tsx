/* eslint-disable react-hooks/exhaustive-deps */
import { PixRoutes } from 'features/pix'
import { updatePixTransfer, updateQrCodePix } from 'features/pix/redux/actions'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { QrCodeTransferMessageView } from './QrCodeTransferMessage.view'

export const QrCodeTransferMessage: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [description, setDescription] = React.useState('')
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false)

  const loading = useSelector((state: StoreState) => state.tags.loading)

  const { transferenceTags, pixKey, infosQrCode } = useSelector(
    (state: StoreState) => ({
      transferenceTags: state.pix.pixTransfer?.tags,
      pixKey: state.pix.pixTransfer?.pixKey,
      infosQrCode: state.pix.infosPixQRCode,
    }),
  )

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value)

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true)
  }

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false)
  }

  const onDefineClick = React.useCallback(() => {
    dispatch(
      updateQrCodePix({
        description: description,
        tags: transferenceTags,
      }),
    )

    history.push(PixRoutes.qrCodeTransferSummary)
  }, [description, transferenceTags, pixKey, infosQrCode])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  return (
    <QrCodeTransferMessageView
      onDescriptionChange={onDescriptionChange}
      onEditTagsClose={onEditTagsClose}
      onEditTagsButtonClick={onEditTagsButtonClick}
      onDefineClick={onDefineClick}
      onCancelButtonClick={onCancelButtonClick}
      description={description}
      openTagEditPopUp={openTagEditPopUp}
      loading={loading}
    />
  )
}
