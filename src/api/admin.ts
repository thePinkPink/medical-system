
import {ajax} from '../common/admin';
import {ajaxC} from '../common/c';

const admin =  {
  // 通过科室获取医生
  getDoctorByDep(data) {
    return ajax('GET', `/admin/choseDoctor/${data.departmentName}`);
  },
  // 获取全部科室
  getDepartment(data) {
    return ajax('GET', '/admin/choseDepartment', data);
  },
  // 添加排班记录
  addSchedule(data) {
    return ajax('POST', '/admin/addSchedule', data);
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
    return ajax('GET', `/admin/getAllSchedule`, data);
  },
  // 登录
  login(data) {
    return ajax('POST', '/admin/login', data, true);
  },
  // 审核医生
  review(data) {
    return ajax('POST', `/doctor/review/${data.tel}`, data);
  },
  // 查询所有未审核医生
  getAllDoctor(data) {
    return ajax('GET', `/doctorUnchecked/list`, data);
  },
  // 删除未审核医生
  deleteDoctor(data) {
    return ajax('DELETE', `/doctorUnchecked/delete/${data.tel}`, data);
  },
  // 添加科室
  addDepartment(data) {
    return ajaxC('POST', `/department/insert`, data);
  },
  // 修改科室
  changeDepartment(data) {
    return ajaxC('POST', `/department/modify`, data);
  },
  // 删除科室
  delDepartment(data) {
    return ajaxC('POST', `/department/del`, data);
  },
  // 查询文章
  listArticle(data) {
    return ajax('GET', `/article/listArticle`, data);
  },
  // 新增文章
  addArticle(data) {
    return ajax('POST', `/article/addArticle`, data);
  },
  // 删除文章
  delArticle(data) {
    return ajax('GET', `/article/delArticle`, data);
  },
};

export default admin;