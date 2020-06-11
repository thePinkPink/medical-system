export const userLogin = (userInfo: any) => {
  return {
      type: 'USER_LOGIN',
      userInfo
  }
}

export const userLogout = (userInfo: any) => {
  return {
      type: 'USER_LOGOUT',
      userInfo
  }
}

export const updateUser = (userInfo: any) => {
  return {
    type: 'UPDATE_USER',
    userInfo
  }
}

export const updateAvatar = (userInfo: any) => {
  return {
    type: 'UPDATE_AVATAR',
    userInfo
  }
}