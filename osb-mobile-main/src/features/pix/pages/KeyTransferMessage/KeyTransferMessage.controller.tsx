/* eslint-disable react-hooks/exhaustive-deps */
import { PixRoutes } from 'features/pix'
import { updatePixTransfer } from 'features/pix/redux/actions'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { KeyTransferMessageView } from './KeyTransferMessage.view'

export const KeyTransferMessage: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [description, setDescription] = React.useState('')
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false)

  const loading = useSelector((state: StoreState) => state.tags.loading)

  const { transferenceTags, pixKey } = useSelector((state: StoreState) => ({
    transferenceTags: state.pix.pixTransfer?.tags,
    pixKey: state.pix.pixTransfer?.pixKey,
  }))

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
      updatePixTransfer({
        description: description,
        tags: transferenceTags,
      }),
    )
    {
      !pixKey
        ? history.push(PixRoutes.bankTransferSummary)
        : history.push(PixRoutes.keyTransferSummary)
    }
  }, [description, transferenceTags, pixKey])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  return (
    <KeyTransferMessageView
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
