import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";
export const Main = () => {
  const [postsList, setPostList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts(); // now we want this function only to be rendered once thus we have used useEffect and an empty dependency array.
  }, []);
  
  return (
    <div>
      {postsList?.map((post) =>( 
        <Post post={post}/>
      ))}
    </div>
  );
};
