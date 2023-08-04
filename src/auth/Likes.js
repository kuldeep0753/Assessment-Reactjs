import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Likes = ({ id, likes }) => {
  const [user] = useAuthState(auth);

  const like = {
    cursor: "pointer",
    color: `likes?.include(user.uid) ? "red":null`,
  };

  const likeRef = doc(db, "Articles", id);
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likeRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else{
        updateDoc(likeRef, {
            likes: arrayUnion(user.uid),
          })
            .then(() => {
              console.log("liked");
            })
            .catch((e) => {
              console.log(e);
            });
    }
  };
  return (
    <div>
      <i
        className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""}`}
        style={like} onClick={handleLike}
      />
    </div>
  );
};

export default Likes;
