
import {ajax} from '../common/doctor';

const doctor =  {
  // 登录
  login(data) {
    return ajax('POST', '/doctor/login', data, true);
  },
  // 注册
  register(data) {
    return ajax('POST', '/doctorUnchecked/register', data);
  },
  // 查询今日订单
  getOrder(data) {
    return ajax('GET', `/doctorRecord/list/${data.doctorId}/${data.recordDate}`, data);
  },
  // 添加排班记录
  addSchedule(data) {
    return ajax('POST ', '/admin/addSchedule', data);
  },
  // 删除排班记录
  delSchedule(data) {
    return ajax('POST', '/admin/delSchedule', data);
  },
  // 获取所有用户
  getAllUser(data) {
    return ajax('GET', '/admin/getAllUser', data);
  },
  // 查看所有排班
  getSchedule(data) {
    return ajax('GET', `/admin/getSchedule/${data.departmentName}`, data);
  },
  // 修改订单状态
  updateRecord(data) {
    return ajax('POST', `/doctorRecord/update/${data.recordId}`, data);
  },
  // 修改订单内容
  writeRecord(data) {
    return ajax('POST', `/doctorRecord/updateMedicalRecord`, data);
  }
};

export default doctor;