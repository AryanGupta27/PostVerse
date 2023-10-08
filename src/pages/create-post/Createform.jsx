import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../App.css";
import { useNavigate } from "react-router";
export const CreateForm = () => {
  const [user] = useAuthState(auth); // to grab the info. of user
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"), //here in the required we have passed a custom error.
    description: yup
      .string()
      .required("You must add a description")
      .min(2)
      .max(200),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts"); //here posts is the name of collection which we have created in the firestore in the firebase
  // and the collection function purpose is to define the reference (here we are referncing it to posts )

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      // this addDoc fucntion returns a promise
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <form className="cool-form" onSubmit={handleSubmit(onCreatePost)}>
      <input
        className="cool-input"
        placeholder="title..."
        {...register("title")}
      />
      <p className="error-message">{errors.title?.message}</p>
      <textarea
        className="cool-textarea"
        placeholder="description..."
        {...register("description")}
      />
      <p className="error-message">{errors.description?.message}</p>
      <input className="cool-submit-button" type="submit" />
        
    </form>
  );
};
