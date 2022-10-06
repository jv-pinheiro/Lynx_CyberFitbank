import { TextField } from 'components'
import React from 'react'

interface CopyPasteCodeFieldViewProps {
  value: string
  onChange: React.ChangeEventHandler
}

export const CopyPasteCodeFieldView: React.FC<CopyPasteCodeFieldViewProps> = ({
  value,
  onChange,
}) => {
  return <TextField label="" value={value} onChange={onChange} />
}
