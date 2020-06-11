import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Tag, message, Button, Modal } from 'antd';

import patient from '../../../../api/patient';


const columns = [
  {
    title: '医生职称',
    dataIndex: 'doctorTitle',
    key: 'doctorTitle',
  }, {
    title: '医生姓名',
    dataIndex: 'doctorName',
    key: 'doctorName',
  }, {
    title: '医生照片',
    dataIndex: 'doctorPhoto',
    key: 'doctorPhoto',
    render: (text, record, index) => {
      return (
        <img src={record.doctorPhoto} width={150}></img>
      )
    }
  }, {
    title: '医生性别',
    dataIndex: 'doctorGender',
    key: 'doctorGender',
  }, {
    title: '医生简介',
    dataIndex: 'doctorInfo',
    key: 'doctorInfo',
  }
];

function DoctorList(props: any) {

  const { data, chooseDay } = props;

  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState<any>({});

  const createRecord = async (data) => {
    const res: any = await patient.createRecord(data);
    if (!res.errCode) {
      setVisible(true);
      setOrder(res.data);
    } else {
      message.error(res.errMsg);
    }
  }

  const pay = async (data) => {
    const res: any = await patient.payRecord(data);
    if (!res.errCode) {
      handleCancel();
      message.success('支付成功，3s后跳转到订单页……');
      setTimeout(function(){ props.history.push('/Patient/Personal/Order') }, 3000);
    } else {
      message.error(res.errMsg);
    }
  }

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Table
        style={{ marginTop: '20px' }}
        columns={[
          ...columns,
          {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
              <>
                <div>
                  <Tag color={'blue'}>
                    上午（08:00 - 12:00）剩余{record.amQuota}位
                </Tag>
                  <Button type='link'
                    onClick={() => createRecord({
                      recordDate: chooseDay,
                      recordTime: 0,
                      doctorId: record.doctorId
                    })}
                  > 预约 </Button>
                </div>
                <div>
                  <Tag color={'blue'}>
                    下午（14:00 - 18:00）剩余{record.pmQuota}位
                </Tag>
                  <Button type='link'
                    onClick={() => createRecord({
                      recordDate: chooseDay,
                      recordTime: 1,
                      doctorId: record.doctorId
                    })}
                  > 预约 </Button>
                </div>
              </>
            ),
          },
        ]}
        dataSource={data}
        bordered={true}
        pagination={false}
      />

      <Modal
        title="我的订单"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>我的医生：{order.doctorName}</p>
        <p>科室：{`${order.departmentName}(${order.departmentPos})`}</p>
        <p>
          就诊日期：{order.recordDate}
          <span>
            {
              order.recordTime ? ' 下午' : ' 上午'
            }
          </span>
        </p>
        <p>费用：{order.recordFare} 元</p>
        <div style={{textAlign: 'center'}}>
          <Button type='primary' onClick={() => pay({recordId: order.recordId})}>支付订单</Button>
        </div>
      </Modal>
    </div>
  )
}

export default withRouter(DoctorList);