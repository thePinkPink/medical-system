
import {ajax} from '../common/client';

const patient =  {
  // 注册
  register(data) {
    return ajax('POST', '/user/register', data);
  },
  // 登录
  login(data) {
    return ajax('POST', '/user/login', data, true);
  },
  // 检查手机号
  checkUserTelUnique(data) {
    return ajax('GET', '/user/checkUserTelUnique', data);
  },
  // 发送验证码
  sendCode(data) {
    return ajax('GET', `/smsmsgs/sendCode/${data.phone}`);
  },
  // 获取用户信息
  getUserInfo() {
    return ajax('POST', '/user/getUserInfo');
  },
  // 更新用户信息
  updateUser(data) {
    return ajax('POST', '/user/updateUser', data);
  },
  // 获取科室信息
  getDepartment(data) {
    return ajax('GET', '/userRecord/choseDepartment', data);
  },
  // 查询当日医生
  choseDoctor(data) {
    return ajax('POST', '/userRecord/choseDoctor', data);
  },
  // 评价订单
  commentRecord(data) {
    return ajax('POST', '/userRecord/commentRecord', data);
  },
  // 预约挂号
  createRecord(data) {
    return ajax('POST', '/userRecord/createRecord', data);
  },
  // 删除订单
  delRecord(data) {
    return ajax('POST', `/userRecord/delRecord/${data.recordId}`, data);
  },
  // 查询订单
  listRecord(data) {
    return ajax('GET', '/userRecord/listRecord', data);
  },
  // 支付订单
  payRecord(data) {
    return ajax('GET', '/userRecord/payRecord', data);
  },
  // 更新头像
  newAvatar(data) {
    return ajax('POST', '/user/newAvatar', data);
  },
  // 获取评论
  getComment(data) {
    return ajax('GET', `/userRecord/getComment/${data.recordId}`, data);
  },
  // 获取评论
  getArticle(data) {
    return ajax('GET', `/article/getArticle`, data);
  },
};

export default patient;