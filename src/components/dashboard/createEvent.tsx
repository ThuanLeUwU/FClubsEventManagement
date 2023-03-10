import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import EventStyles from "./styles/event.module.scss";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";

export const CreateEvent = () => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState();
  const [imageDataUrl, setImageDataUrl] = useState();
  const [formDataImage, setFormDataImage] = useState();
  const [ image, setImage] = useState<string>();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, imageDataUrl, data.file[0], "hellu");
    // const formData = new FormData();
    // formData.append("file", imageDataUrl);
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("location", data.location);
    // formData.append("point", data.point);
    // formData.append("start", data.start);
    // formData.append("end", data.end);
    // formData.append("date", data.date);

    // console.log('body', bodyRequest)

    try {
      const bodyRequest = {
        name: data.name,
        email: data.email,
        location: data.location,
        image: formDataImage,
        point: data.point,
        start: data.start,
        end: data.end,
        date: data.date,
      };

      const response = await axios.post(
        "https://event-project.herokuapp.com/api/event/insert",
        bodyRequest
        // formData
      );

      console.log("Response: ", response);
      console.log("abc");
    } catch (error) {
      console.error(error);
    }
  };

  const getBase64 = (img, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleImageChange = (event) => {
    // setImageDataUrl(event.target.files[0]);
    // console.log(event.target.files[0]);
    setFormDataImage(event.file.originFileObj);
    getBase64(event.file.originFileObj, (url) => {
      setImage(url);
    });
  };

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
    <div>
      <div className={`${EventStyles.modal_button}`}>
        <button onClick={handleOpenModal} className={`${EventStyles.modal_button_content}`}>
          Create Event
        </button>
      </div>
      <Modal isOpen={showModal} className={`${EventStyles.modal}`}>
        <div className={`${EventStyles.modal_content}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Name</label>
              <input {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div>
              <label>Email</label>
              <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              {errors.email && errors.email.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span>Invalid email address</span>
              )}
            </div>
            <div>
              <label>Location</label>
              <input {...register("location", { required: true })} />
              {errors.location && <span>This field is required</span>}
            </div>
            <div>
              <input type="file" {...register("file")} onChange={handleImageChange} />
              {imageDataUrl && <img width={200} src={imageDataUrl} />}

              {/* <button onClick={handleSubmitImg}>submit</button> */}
            </div>
            <div>
              <label>point</label>
              <input {...register("point", { required: true })} />
              {errors.point && <span>This field is required</span>}
            </div>
            <div>
              <label>Date start</label>
              <input {...register("start", { required: true })} />
              {errors.location && <span>This field is required</span>}
            </div>
            <div>
              <label>Date end</label>
              <input {...register("end", { required: true })} />
              {errors.location && <span>This field is required</span>}
            </div>
            <div>
              <label>Date</label>
              <input {...register("date", { required: true })} />
              {errors.location && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
          </form>
          {/* <button onClick={handleCloseModal}>Create</button> */}
        </div>
      </Modal>
    </div>
  );
};
