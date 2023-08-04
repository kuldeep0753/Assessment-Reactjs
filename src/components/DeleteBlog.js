import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

const DeleteBlog = ({ id, imageUrl }) => {
  const deleteBtn = {
    // background: "red",
    // borderRadius: "13px",
    // padding: "8px 20px",
    // color: "white",
    // fontSize: "medium",
    // fontWeight: "600",
    position: "absolute",
    left: "322px",
    top: "196px",
    cursor: "pointer",
  };
  const handleDelete = async () => {
    if (window.confirm("Are you delet this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Articled delete successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting article", { type: "success" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      {/* <button style={deleteBtn} onClick={handleDelete}>
        Delete
      </button> */}
      <i className="fa fa-times" onClick={handleDelete} style={deleteBtn}></i>
    </div>
  );
};

export default DeleteBlog;
