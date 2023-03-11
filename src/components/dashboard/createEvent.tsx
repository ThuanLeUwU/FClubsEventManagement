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
import { FormControl, MenuItem} from "@mui/material";
// import { Option } from "antd/es/mentions";
// import locale from "antd/es/date-picker/locale/en_US";

interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;
  setCount:  (e: Number) => void;
  count : number
  // setSuccess: (e: boolean) => void;
}

export const CreateEvent = ({ onCancel, visible, isEdit, setCount, count}: IProps) => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState();
  const [imageDataUrl, setImageDataUrl] = useState();
  const [formDataImage, setFormDataImage] = useState();
  const [image, setImage] = useState<string>();
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [checkValid, setCheckValid] = useState();
  const [campus, setCampus] = useState();
  const [selected, setSelected] = useState(user.campus);
  const [club, setClubs] = useState([]);
  const { Option } = Select;

  console.log(club);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  useEffect(() => {
    console.log("select");
    const fetchData = async () => {
      const response = await axios.get(
        `https://event-project.herokuapp.com/api/club/campus/${selected}`
      );
      setClubs(response?.data);
    };
    fetchData();
  }, [selected]);

  const handleSubmit = async (data) => {
    console.log(data, "hellu");

    const formData = new FormData();
    formData.append("file", formDataImage);
    formData.append("name", data.event_name);
    formData.append("email", data.email);
    formData.append("location", data.location);
    formData.append("point", data.point);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("description", data.description);
    formData.append("organizer", user.id);
    // formData.append("club", selected);

    // console.log("haha",selected)

    // formData.append("date", data.date);
    // console.log('body', bodyRequest)
    // console.log("image", formDataImage)
    try {
      // const bodyRequest = {
      //   event_name: data.name,
      //   email: data.email,
      //   location: data.location,
      //   image: formDataImage,
      //   point: data.point,
      //   start: data.start,
      //   end: data.end,
      //   date: data.date,
      // };

      const response = await axios.post(
        "https://event-project.herokuapp.com/api/event/insert",
        // bodyRequest
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
        
      console.log("Response: ", response);
      console.log("abc");
        setCount(count + 1);

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

  
  const handleChangeClub = (event) => {
    setSelected(event.value);
  }

  // const disabledEndDate = (current) => {
  //   // Disable dates before today
  //   return current && current < moment().startOf(startDate);
  // };
  // const handleImageChange = (event) => {
  //   // setImageDataUrl(event.target.files[0]);
  //   // console.log(event.target.files[0]);
  //   setFormDataImage(event.file.originFileObj);
  //   getBase64(event.file.originFileObj, (url) => {
  //     setImage(url);
  //   });
  // };

  // const handleSubmit = (data) => {
  //   console.log(data);
  // }

  // const handleSubmitImg = async () => {
  //   console.log("File", imageDataUrl);
  //   const formData = new FormData();
  //   formData.append("file", imageDataUrl);
  //   try {
  //     const response = await axios.post(
  //       "https://event-project.herokuapp.com/images",
  //       formData
  //     );

  //     console.log("Response: ", response);
  //     console.log("abc");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
          rules={[{ required: true, message: "Please input Email!" }]}
          label="Email: "
          name="email"
        >
          <Input />
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
          rules={[{ required: true, message: "Please input Date!" }]}
          label="Point:  "
          name="point"
        >
          <InputNumber />
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
          rules={[{ required: true, message: "Please input Description!" }]}
          label="Description: "
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Space className="justify-end w-full">
          <Form.Item className="mb-0">
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {isEdit ? "Update" : "Create"}
              </Button>
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
