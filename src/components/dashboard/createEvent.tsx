import React, { useState } from "react";
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
} from "antd";
import { UploadFileOutlined } from "@mui/icons-material";
import moment from "moment";
// import locale from "antd/es/date-picker/locale/en_US";

interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean
}

export const CreateEvent = ({ onCancel, visible, isEdit }: IProps) => {
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
    formData.append("organizer",user.id);

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
      onCancel();
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
  }
  const handleEndDatePickerChange = (date, dateString) => {
    // const selectedTime = moment(dateString, "YYYY-MM-DD HH:mm:ss");
    setEndDate(dateString);
    console.log("time", dateString);
  }

  const disabledDate = (current) => {
    // Disable dates before today
    if (current && current < moment().startOf('day')) {
      return true;
    }

    // Disable dates after the selected date
    if (startDate && current && current < moment(startDate).endOf('day')) {
      return true;
    }

    return false;
  };

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
    // <div>
    //   <div className={`${EventStyles.modal_button}`}>
    //     <button onClick={handleOpenModal} className={`${EventStyles.modal_button_content}`}>
    //       Create Event
    //     </button>
    //   </div>
    //   <Modal isOpen={showModal} className={`${EventStyles.modal}`}>
    //     <div className={`${EventStyles.modal_content}`}>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div>
    //           <label>Name</label>
    //           <input {...register("name", { required: true })} />
    //           {errors.name && <span>This field is required</span>}
    //         </div>
    //         <div>
    //           <label>Email</label>
    //           <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
    //           {errors.email && errors.email.type === "required" && (
    //             <span>This field is required</span>
    //           )}
    //           {errors.email && errors.email.type === "pattern" && (
    //             <span>Invalid email address</span>
    //           )}
    //         </div>
    //         <div>
    //           <label>Location</label>
    //           <input {...register("location", { required: true })} />
    //           {errors.location && <span>This field is required</span>}
    //         </div>
    //         <div className="flex items-center justify-center pt-2 pb-2">
    //           <Upload accept="image/png, image/jpeg"
    //         onChange={handleChange}
    //         beforeUpload={beforeUpload}
    //         // headers={{ Authorization: authorization }}
    //         action="https://node-js-fpt-wallet.herokuapp.com/services/images"/>
    //           {imageDataUrl && <img width={200} src={imageDataUrl} />}

    //           {/* <button onClick={handleSubmitImg}>submit</button> */}
    //         </div>
    //         <div>
    //           <label>point</label>
    //           <input {...register("point", { required: true })} />
    //           {errors.point && <span>This field is required</span>}
    //         </div>
    //         <div>
    //           <label>Date start</label>
    //           <input {...register("start", { required: true })} />
    //           {errors.location && <span>This field is required</span>}
    //         </div>
    //         <div>
    //           <label>Date end</label>
    //           <input {...register("end", { required: true })} />
    //           {errors.location && <span>This field is required</span>}
    //         </div>
    //         <div>
    //           <label>Date</label>
    //           <input {...register("date", { required: true })} />
    //           {errors.location && <span>This field is required</span>}
    //         </div>
    //         <button type="submit">Submit</button>
    //       </form>
    //       {/* <button onClick={handleCloseModal}>Create</button> */}
    //     </div>
    //   </Modal>
    // </div>
    <Modal
      className="w-1/2 min-h-[300px]"
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
          <DatePicker showTime 
          format="YYYY-MM-DD HH:mm:ss" 
          onChange={handleStartDatePickerChange}  
          disabledDate={disabledDate}/>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input Date!" }]}
          label="to:  "
          name="date_end"
        >
          <DatePicker showTime 
          format="YYYY-MM-DD HH:mm:ss" 
          onChange={handleEndDatePickerChange} 
          disabledDate={disabledDate}/>
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
              <Button htmlType="submit" 
              type="primary">
                {isEdit ? 'Update' : 'Create'}
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
// import { getCookie } from 'cookies-next'
// // import { IProduct } from 'interfaces/product'
// import React, { useEffect, useState } from 'react'
// import { useAuthContext } from '../../contexts/auth-context'
// import { IEvent } from '../../interfaces/event'
// // import axiosWrapper from 'utils/axiosWrapper'

// interface IProps {
//   onCancel: () => void
//   visible: boolean
//   setVisible: (e: boolean) => void
//   productDetail?: IEvent
//   isEdit?: boolean
// }
// const optionCategories = [
//   { label: 'Đồ điện tử', value: '1' },
//   { label: 'Voucher', value: '2' },
// ]

// const token = getCookie('accessToken')

// const authorization = token ? `Bearer ${token}` : ''

// const ProductModal = ({ onCancel, visible, productDetail, isEdit }: IProps) => {
//   const [form] = Form.useForm()
//   const [image, setImage] = useState<string>()
//   const [formDataImage, setFormDataImage] = useState()
//   const { user }: any = useAuthContext();
//   console.log(user?.data?.id)
//   const handleSubmit = async (value) => {
//     try {
//       const payload = {
//         file: formDataImage,
//         ...value,
//       }
//       await axios.post(`/products`, payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       message.success('Create Product Success')
//       onCancel()
//     } catch (error) {
//       message.error(error.toString())
//     }
//   }
//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!')
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!')
//     }
//     return isJpgOrPng && isLt2M
//   }
//   const getBase64 = (img, callback: (url: string) => void) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => callback(reader.result as string))
//     reader.readAsDataURL(img)
//   }
//   const handleChange = (info) => {
//     if (info.file.status === 'uploading') {
//       return
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.

//       setFormDataImage(info.file.originFileObj)
//       getBase64(info.file.originFileObj, (url) => {
//         setImage(url)
//       })
//     }
//   }

//   useEffect(() => {
//     form.setFieldsValue({
//       // product_name: productDetail?.name,
//       // quantity: productDetail?.,
//       // product_price: productDetail?.product_price,
//       // category_id: productDetail?.category_id,
//       // description: productDetail?.description,
//     })
//     setImage(productDetail?.image)
//   }, [productDetail])

//   return (
//     <Modal
//       className="w-1/2 min-h-[300px]"
//       title={isEdit ? 'Edit PRoduct' : 'Create Product'}
//       destroyOnClose
//       open={visible}
//       onCancel={onCancel}
//       footer={false}
//     >
//       <Form
//         autoComplete="off"
//         form={form}
//         labelCol={{ span: 5 }}
//         wrapperCol={{ span: 15 }}
//         layout="horizontal"
//         className="mt-5"
//         onFinish={handleSubmit}
//         initialValues={isEdit ? productDetail : undefined}
//       >
//         <div className="flex items-center justify-center">
//           <Image width={200} height={200} src={image} />
//         </div>
//         <div className="flex items-center justify-center pt-2 pb-2">
//           <Upload
//             accept="image/png, image/jpeg"
//             onChange={handleChange}
//             beforeUpload={beforeUpload}
//             headers={{ Authorization: authorization }}
//             action="https://node-js-fpt-wallet.herokuapp.com/services/images"
//           >
//             <Button icon={<UploadOutlined />}>Upload</Button>
//           </Upload>
//         </div>
//         <Form.Item
//           rules={[{ required: true, message: 'Please input Product Name!' }]}
//           label="Product Name: "
//           name="product_name"
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           rules={[{ required: true, message: 'Please input Quantity!' }]}
//           label="Quantity:  "
//           name="quantity"
//         >
//           <InputNumber />
//         </Form.Item>
//         <Form.Item
//           rules={[{ required: true, message: 'Please input Product Price!' }]}
//           label="Price:  "
//           name="product_price"
//         >
//           <InputNumber />
//         </Form.Item>
//         <Form.Item
//           rules={[
//             { required: true, message: 'Please select Product Category!' },
//           ]}
//           label="Category"
//           name="category_id"
//         >
//           <Select options={optionCategories} />
//         </Form.Item>
//         <Form.Item
//           rules={[{ required: true, message: 'Please input Description!' }]}
//           label="Description "
//           name="description"
//         >
//           <Input.TextArea />
//         </Form.Item>
//         <Space className="justify-end w-full">
//           <Form.Item className="mb-0">
//             <Space>
//               <Button onClick={onCancel}>Cancel</Button>
//               <Button htmlType="submit" type="primary">
//                 {isEdit ? 'Update' : 'Create'}
//               </Button>
//             </Space>
//           </Form.Item>
//         </Space>
//       </Form>
//     </Modal>
//   )
// }

// export default ProductModal
