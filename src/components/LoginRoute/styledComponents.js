import styled from 'styled-components'

export const InputContainer = styled.div`
  border: 1px solid #64748b;
  width: 271px;
  padding: 8px, 8px, 8px, 8px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 12px;
  border-radius: 8px;
  @media screen and (min-width: 576px) {
    width: 383px;
  }
`
export const ShowPasswordContainer = styled.div`
  display: flex;
  align-items: center;
`
export const CheckBox = styled.input`
  height: 16px;
  width: 16px;
  margin-right: 10px;
`
export const CheckBoxLabel = styled.label`
  font-size: 16px;
  color: #333333;
`
export const ErrorMsg = styled.p`
  color: #ef4444;
  margin-bottom: 20px;
`
