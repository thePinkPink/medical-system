const adminState = {
  isLog: false,
  userMsg: {
    departmentName: "",
    doctorId: null,
    doctorInfo: "",
    doctorName: "",
    doctorPhoto: "",
    doctorTel: "",
    doctorTitle: ""
  }
}

const doctor = (state = adminState, action: { type: any; userInfo: any; }) => {

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

export default doctor;

