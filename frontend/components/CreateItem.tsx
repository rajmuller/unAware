import { FC, SyntheticEvent, useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";

import { Form, Formik } from "formik";
import { TextInput } from "./FormFields";

const loadingFrame = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const StyledForm = styled(Form)`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    margin-bottom: 1rem;
    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.red};
    }
  }

  label {
    display: block;
  }

  div {
    color: ${({ theme }) => theme.red};
    font-size: 1rem;
  }
`;

const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;

  &[disabled] {
    opacity: 0.5;
  }
  &::before {
    height: 10px;
    margin-bottom: 1rem;
    content: "";
    display: block;
    background-image: linear-gradient(
      to right,
      #ff3019 0%,
      #e2b04a 50%,
      #ff3019 100%
    );
  }
  &[aria-busy="true"]::before {
    background-size: 50% auto;
    animation: ${loadingFrame} 0.5s linear infinite;
  }
`;

const Button = styled.button`
  width: auto;
  background: red;
  color: white;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
`;

// type ThumbnailProps = {
//   file: any;
// };
//
// const Thumbnail: FC<ThumbnailProps> = ({ file }) => {
//   const [loading, setLoading] = useState(false);
//   const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(null);
//
//   if (!file) {
//     return null;
//   }
//
//   const reader = new FileReader();
//
//   reader.onloadend = () => {
//     setThumbnail(reader.result);
//   };
//
//   reader.readAsDataURL(file);
// };

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Min 3 characters")
    .max(25, "Max 25 characters")
    .required("Required"),
  description: Yup.string()
    .min(5, "Min 5 characters")
    .max(120, "Max 120 characters")
    .required("Required"),
  price: Yup.number()
    .min(100, "Min 100 cents")
    .max(10000000, "Max 10.000.000")
    .required("Required"),
  image: Yup.string().required("Required"),
});
type CreateItemProps = {};

const CreateItem: FC<CreateItemProps> = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [largeImageUrl, setlargeImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  // const [createItem, { loading }] = useCreateItemMutation();

  const handleUploadImage = useCallback(async (e, setFieldValue) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    setUploadingImage(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "unAware");

    const res = await fetch(
      // TODO: implement signed upload
      "https://api.cloudinary.com/v1_1/dmneguw7w/image/upload",
      { method: "POST", body: data }
    );
    if (!res.ok) {
      setUploadingImage(false);
      return;
    }
    const uploadedFile = await res.json();
    if (uploadedFile === "error") {
      return;
    }
    setFieldValue("image", files[0].)
    setImageUrl(uploadedFile.secure_url);
    setlargeImageUrl(uploadedFile.eager[0].secure_url);
    setUploadingImage(false);
  }, []);

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        price: 0,
        image: "",
        largeImage: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, isSubmitting, values: { image } }) => (
        <StyledForm>
          <Fieldset
            disabled={uploadingImage || isSubmitting}
            aria-busy={uploadingImage || isSubmitting}
          >
            <TextInput
              label="title"
              name="title"
              type="text"
              placeholder="title"
            />
            <TextInput
              label="price (cents)"
              name="price"
              type="number"
              placeholder="price"
            />
            <TextInput
              label="description"
              name="description"
              type="text"
              placeholder="description"
            />
            <TextInput
              label="image"
              name="image"
              type="file"
              placeholder="upload image"
              onChange={(e: SyntheticEvent) =>
                handleUploadImage(e, setFieldValue)
              }
            />
            {image && <img width={200} src={image} alt="Upload Preview" />}
            <Button type="submit">Submit</Button>
          </Fieldset>
        </StyledForm>
      )}
    </Formik>
  );
};

export default CreateItem;
