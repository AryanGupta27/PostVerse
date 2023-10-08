import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "../../App.css";
export const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState(null);

  const likesRef = collection(db, "likes");

  // for the likes count we will use the query function and where from firestore
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    ); // here we are getting the userId so that we can know which user liked the post
  };

  const addLike = async (data) => {
    try {
      const newDoc = await addDoc(likesRef, {
        // this addDoc fucntion returns a promise
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [...prev, { userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async (data) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  // to call getlikes we will useEffect
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="container">
      <div className="post-container">
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <div className="post-description">
          <p>{post.description}</p>
        </div>
        <div className="post-details">
          <p className="username">@{post.username}</p>
          <button
            onClick={hasUserLiked ? removeLike : addLike}
            className="like-button"
          >
            {hasUserLiked ? <>&#10084;</> : <>&#9825;</>}
          </button>
          {likes && <p className="like-count">Likes:{likes?.length}</p>}
        </div>
      </div>
     </div>
  );
};
