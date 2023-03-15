import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useState } from 'react';



import { DatePicker, Form, Input, Button } from 'antd';
import moment from "moment";
import { async } from '@firebase/util';
import axios from 'axios';
import { format } from 'date-fns';





export const AccountProfileDetails = ({ userInf }) => {
  console.log('use', userInf);

  const [date, setDate] = useState(moment(userInf.birthday));
  const oldDate = userInf.birthday;
  const [form] = Form.useForm();
  const [phone, setPhone] = useState(userInf.phone);
  const oldPhone = `${userInf.phone}`;
  const [address, setAddress] = useState(userInf.address);
  const oldAddress = `${userInf.address}`;





  const handleDatePickerChange = (date, dateString) => {
    setDate(date);
  };
  const handleAddressChange = (value) => {
    setAddress(value.target.value);
  }

  const handlePhoneChange = (value) => {
    setPhone(value.target.value);
  }

  const disabledDate = (current) => {
    const tenYearsAgo = moment().subtract(1, 'years');
    return current && current > tenYearsAgo;
  };

  const onSubmit = async (values) => {
    if(oldAddress === address && oldPhone === phone ) {
      const bodyRequest = {
        phone: phone,
        address: address,
        birthday: date.format('YYYY-MM-DD'),
      }
      await axios.put(`https://event-project.herokuapp.com/api/student/${userInf.student_id}`, bodyRequest)
    }
    
  };


  return (
    <Box
      autoComplete="off"
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>

          <Form
            form={form}
            initialValues={{ date: date, phone: phone, address: address }}
            onFinish={onSubmit}>
            <Form.Item
              label="Date of Birth:  "
              name="date"
              tooltip={{title: 'Just choose date at least 1 year ago!!'}}
            >
              <DatePicker
                showTime
                disabledDate={disabledDate}
                format="DD/MM/YYYY"
                onChange={handleDatePickerChange}
              />
            </Form.Item>
            <Form.Item name="phone" label='Phone' >
              <Input placeholder="phone" value={phone} onChange={handlePhoneChange} />
            </Form.Item>

            <Form.Item name='address' label='Address'>
              <Input placeholder="Address"  value={address} onChange={handleAddressChange} />
            </Form.Item>

            <Box display='flex' justifyContent='end'>
              <Form.Item >
                <Button type="primary" htmlType="submit" >
                  Save
                </Button>
              </Form.Item>
            </Box>

          </Form>
        </CardContent>
        <Divider />

      </Card>

    </Box>
  );
};
