import styled from './css/UserAccount.module.css'

export default function UserAccount() {
  return (
    <div className={styled.userContainer}>
      <h3 className={styled.heading}>my account</h3>
      <h3 className={styled.heading}>edit profile ⚙</h3>
      <h3 className={styled.heading}>credits</h3>
    </div>
  )
}
