const adminState = {
  isLog: false,
  userMsg: {
    userName: '',
    userTel: ''
  }
}

const admin = (state = adminState, action: { type: any; userInfo: any; }) => {

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
    default:
      return state
  }
}

export default admin;

