import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useForm } from "react-hook-form";
// import Modal from "react-modal";
import EventStyles from "./styles/event.module.scss";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Upload,
  Select
} from "antd";
import { UploadFileOutlined } from "@mui/icons-material";
import moment from "moment";

// import { Option } from "antd/es/mentions";
// import locale from "antd/es/date-picker/locale/en_US";

interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;

  // setSuccess: (e: boolean) => void;
}

export const CreateEvent = ({ onCancel, visible, isEdit }: IProps) => {
  const { user } = useAuthContext();
  const [formDataImage, setFormDataImage] = useState();
  const [image, setImage] = useState<string>();
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selected, setSelected] = useState();
  const [selectedPoint, setSelectedPoint] = useState('10');
  const [club, setClubs] = useState([]);
  const { Option } = Select;

  const point = [
    {
      id: 1, name: '10', value: '10'
    },
    {
      id: 2, name: '20', value: '20'
    },
    {
      id: 3, name: '30', value: '30'
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://event-project.herokuapp.com/api/club/student/${user.id}`
      );
      setClubs(response?.data);
      console.log(response?.data);
      if (response?.data.length !== 0) {
        setSelected(response?.data[0].club_id)
      };

    };
    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", formDataImage);
    formData.append("name", data.event_name);
    formData.append("club_id", selected);
    formData.append("student_id", user.id);
    formData.append("email", user.email);
    formData.append("location", data.location);
    formData.append("point", selectedPoint);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("description", data.description);
    try {
      await axios.post(
        "https://event-project.herokuapp.com/api/event/insert",
        // bodyRequest
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onCancel();
      // setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataImage(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setImage(url);
      });
    }
  };

  const handleStartDatePickerChange = (date, dateString) => {
    // const selectedTime = moment(dateString, "YYYY-MM-DD HH:mm:ss");
    setStartDate(dateString);
    console.log("time", dateString);
  };
  const handleEndDatePickerChange = (date, dateString) => {
    // const selectedTime = moment(dateString, "YYYY-MM-DD HH:mm:ss");
    setEndDate(dateString);
    console.log("time", dateString);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    if (current && current < moment().startOf("day")) {
      return true;
    }
    // Disable dates after the selected date
    if (startDate && current && current < moment(startDate).endOf("day")) {
      return true;
    }

    return false;
  };


  const handleChangeClub = (value) => {
    setSelected(value);
  }

  const handleChangePoint = (value) => {
    setSelectedPoint(value);
  }





  return (
    <Modal
      className="w-2/3 min-h-[300px]"
      // title={isEdit ? 'Edit PRoduct' : 'Create Product'}
      destroyOnClose
      open={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        className="mt-5"
        onFinish={handleSubmit}
      // initialValues={isEdit ?  : undefined}
      >
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="flex items-center justify-center"
        >
          <Image width={200} height={200} src={image} />
        </div>
        <div
          className="flex items-center justify-center pt-2 pb-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Upload
            accept="image/png, image/jpeg"
            onChange={handleChange}
            beforeUpload={beforeUpload}
            // headers={{ Authorization: authorization }}
            action="https://event-project.herokuapp.com/images"
          >
            <Button icon={<UploadFileOutlined />}>Upload</Button>
          </Upload>
        </div>
        <Form.Item
          rules={[{ required: true, message: "Please input Event Name!" }]}
          label="Event Name: "
          name="event_name"
        >
          <Input />
        </Form.Item>
        <Form.Item

          label="Club_Name: "
          name="club_name"
        >

          <Select defaultValue={selected} onChange={handleChangeClub}>
            {club.map(option => (
              <Option key={option.club_id} value={option.club_id}>
                {option.club_name}
              </Option>
            ))}
          </Select>

        </Form.Item>
        <Form.Item

          label="Email: "
          name="email"
        >
          {`${user.email}`}
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input Location!" }]}
          label="Location:  "
          name="location"
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          rules={[{ required: true, message: "Please input Location!" }]}
          label="Club:  "
          name="club"
        > 
            <Select value={Option} 
            defaultValue={selected} 
            onChange={handleChangeClub}
            style={{width: "100%"}}>
              {club.map((option) => (
                <Option key={option.club_id} 
                value={option.club_id}>
                  {option.abbreviation}
                </Option>
              ))}
            </Select>
        </Form.Item> */}
        <Form.Item
          label="Point:  "
          name="point"
        >
          <Select defaultValue={selectedPoint} onChange={handleChangePoint}>
            {point.map(option => (
              <Option key={option.id} value={option.value}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input Date!" }]}
          label="From:  "
          name="date_start"
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={handleStartDatePickerChange}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input Date!" }]}
          label="to:  "
          name="date_end"
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={handleEndDatePickerChange}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label="Description: "
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Space className="justify-end w-full">
          <Form.Item className="mb-0">
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              {club.length === 0 ? (
                <Button htmlType="submit" type="primary" disabled>
                  {isEdit ? "Update" : "Create"}
                </Button>
              ) : (<Button htmlType="submit" type="primary">
                {isEdit ? "Update" : "Create"}
              </Button>)}

            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

// import { UploadOutlined } from '@ant-design/icons'
// import {
//   Button,
//   Form,
//   Image,
//   Input,
//   InputNumber,
//   message,
//   Modal,
//   Select,
//   Space,
//   Upload,
// } from 'antd'
// import axios from 'axios'
// // import { useAuth } from 'config/context/AuthContext'
//
