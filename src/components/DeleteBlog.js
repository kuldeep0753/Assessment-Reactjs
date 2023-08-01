import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject,ref } from "firebase/storage";

const DeleteBlog = ({ id, imageUrl }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Articles", id));
      toast("Articled delete successfully", { type: "success" });
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      toast("Error deleting article", { type: "success" });
      console.log(error);
    }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteBlog;
