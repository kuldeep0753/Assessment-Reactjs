// import { Timestamp } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import React from "react";
// import { useState } from "react";
// import { storage, db } from "../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// const AddBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: "",
//     createdAt: Timestamp.now().toDate(),
//   });

//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handlePublish = () => {
//     if (!formData.title || !formData.description || !formData.image) {
//       alert("Please fill all the fields");
//       return;
//     }

//     const storageRef = ref(
//       storage,
//       `/images/${Date.now()}${formData.image.name}`
//     );
//     const uploadImage = uploadBytesResumable(storageRef, formData.image);
//     uploadImage.on(
//       "state_changed",
//       (snapshot) => {
//         const progressPercent = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progressPercent);
//       },
//       (err) => {
//         console.log(err);
//       },
//       () => {
//         setFormData({
//           title: "",
//           description: "",
//           image: "",
//         });

//         getDownloadURL(uploadImage.snapshot.ref).then((url) => {
//           const articleRef = collection(db, "Articles");
//           addDoc(articleRef, {
//             title: formData.title,
//             description: formData.description,
//             imageUrl: url,
//             createdAt: Timestamp.now().toDate(),
//           })
//             .then(() => {
//               toast("Article added successfully", { type: "success" });
//               setProgress(0);
//             })
//             .catch((err) => {
//               toast("Article added successfully", { type: "error" });
//             });
//         });
//       }
//     );
//   };
//   return (
//     <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
//       <h2>Create Article</h2>
//       <label htmlFor="title">Title</label>
//       <input
//         type="text"
//         name="title"
//         className="form-control"
//         value={formData.title}
//         onChange={(e) => handleChange(e)}
//       />

//       {/* description */}
//       <label htmlFor="description">Description</label>
//       <textarea
//         name="description"
//         className="form-control"
//         value={formData.description}
//         onChange={(e) => handleChange(e)}
//       />

//       {/* Image */}
//       <label htmlFor="image">Image</label>
//       {/* here accept attribute can accept all types of images , we can mention specific as awell */}
//       <input
//         type="file"
//         name="image"
//         accept="image/*"
//         className="form-control"
//         onChange={(e) => handleImageChange(e)}
//       />

//       {/* Progress */}
//       {progress === 0 ? null : (
//         <div className="progress">
//           <div
//             className="progress-bar progress-bar-striped mt-2"
//             style={{ width: `${progress}%` }}
//           >
//             `Uploading: ${progress}%`
//           </div>
//         </div>
//       )}

//       <button
//         className="form-control btn btn-primary mt-2"
//         onClick={handlePublish}
//       >
//         Publish
//       </button>
//     </div>
//   );
// };

// export default AddBlog
// --------------------------
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { storage, db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const AddBlog = () => {
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy:user.displayName,
            userId:user.uid,
            // likes:[],
            comments:[]
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Article added successfully", { type: "error" });
            });
        });
      }
    );
  };

  const fontStyle = {
    fontSize: "x-large",
    fontWeight: "bold",
    marginRight: "75px",
  };
  return (
    <div
      className="border p-3 mt-3 bg-light"
      style={{
        border: "2px solid black",
        background: "darkgrey",
        maxWidth: "100%",
        width: "100%",
        marginLeft: "32%",
      }}
    >
      {!user ? (
        <>
          <Link to="/login">Login to Create Article</Link>
          Dont't have an account ? <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <div>
            <h2>Create Article</h2>
          </div>

          <div>
            {" "}
            <label htmlFor="title" style={fontStyle}>
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* description */}
          <div>
            {" "}
            <label htmlFor="description" style={fontStyle}>
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* Image */}
          <div>
            <label htmlFor="image" style={fontStyle}>
              Image
            </label>
            {/* here accept attribute can accept all types of images , we can mention specific as awell */}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <br />
          {/* Progress */}
          <div>
            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped mt-2"
                  style={{ width: `${progress}%` }}
                >
                  `Uploading: ${progress}%`
                </div>
              </div>
            )}
          </div>
          <br />
          <div>
            <button
              className="form-control btn btn-primary mt-2"
              onClick={handlePublish}
            >
              Add Blog
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddBlog;
