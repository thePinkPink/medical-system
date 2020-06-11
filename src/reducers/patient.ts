const patientState = {
  isLog: false,
  userMsg: {
    userAge: null,
    userAvatar: '',
    userGender: '',
    userName: '',
    userTel: ''
  }
}

const patient = (state = patientState, action: { type: any; userInfo: any; }) => {

  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        ...action.userInfo
      }
    case 'USER_LOGOUT':
      return {
        ...state,
        ...action.userInfo
      }
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.userInfo
      }
    case 'UPDATE_AVATAR':
      return {
        ...state,
        ...action.userInfo
      }
    default:
      return state
  }
}

export default patient

