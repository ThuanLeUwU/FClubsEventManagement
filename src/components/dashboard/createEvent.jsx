import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import EventStyles from "./styles/event.module.scss";
import axios from "axios";


export const CreateEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState();

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

  const onSubmit = (data) => {
    console.log(data,imageDataUrl);
  };

  const [imageDataUrl, setImageDataUrl] = useState();

  function handleImageChange(event) {
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onloadend = () => {
    //   setImageDataUrl(reader.result);
    // };
    // reader.readAsDataURL(event.target.files[0]);
    setImageDataUrl(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  // const handleSubmit = (data) => {
  //   console.log(data);
  // }



  const handleSubmitImg = async () => {
    console.log("File", imageDataUrl);
    const formData = new FormData();
    formData.append("file", imageDataUrl);
    try {
      const response = await axios.post(
        "https://event-project.herokuapp.com/images",
        formData
      );

      console.log("Response: ", response);
      console.log("abc");
    } catch (error) {
      console.error(error);
    }
  };

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
              <input type="file" 
              {...register("file")} 
              onChange={handleImageChange}
               />
              {imageDataUrl && <img width={200} 
              src={imageDataUrl} />}

              {/* <button onClick={handleSubmitImg}>submit</button> */}
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
            <button type="submit">Submit</button>
          </form>
          {/* <button onClick={handleCloseModal}>Create</button> */}
        </div>
      </Modal>
    </div>
  );
};
