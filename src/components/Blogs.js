import React from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
//get article from databse
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
//get db from firebase
import { db } from "../firebaseConfig";
import DeleteBlog from "./DeleteBlog";
import { auth } from "../firebaseConfig";
import Likes from "../auth/Likes";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const articleRef = collection(db, "Articles");

    //get the query from database
    const q = query(articleRef, orderBy("createdAt", "desc"));
    //get the data from firebase
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot)
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);

  console.log(articles.length);
  return (
    <div>
      {articles.length === 0 ? (
        <p
          className="border mt-3 p-3 bg-light"
          style={{ marginRight: "100px" }}
        >
          No articles Found here
        </p>
      ) : (
        // here we did destructuring
        articles.map(
          ({
            id,
            imageUrl,
            title,
            description,
            createdAt,
            createdBy,
            userId,
            comments,
            likes,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/blog/${id}`}>
                    {" "}
                    <img
                      src={imageUrl}
                      alt={title}
                      style={{ height: 180, width: 180 }}
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3" style={{ textAlign: "center" }}>
                  <div className="row">
                    <div className="col-6">
                      {createdBy && <span className="">{createdBy}</span>}
                    </div>
                    <div>
                      {user && user.uid === userId && (
                        <DeleteBlog id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  <h2>{title}</h2>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h4>{description}</h4>
                  <div>{user && <Likes id={id} likes={likes} />}
                  <div className="n-likes">
                    <p>{likes?.length} likes</p>
                  </div>
                  {
                    comments && comments.length >0 && (
                      <p>{comments?.length} comments</p>
                    )
                  }
                  </div>

                  {/* <DeleteBlog /id={id} imageUrl={imageUrl} /> */}
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Blogs;
