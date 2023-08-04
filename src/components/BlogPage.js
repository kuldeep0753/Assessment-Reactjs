import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import Likes from "../auth/Likes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import "./BlogPage.css";
import Comment from "./Comment";
//Article
const BlogPage = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(
      docRef,
      (snapshot) => {
        setArticle({ ...snapshot.data(), id: snapshot.id });
      },
      [0]
    );
    console.log(article);
  });
  return (
    <div className="blog-page">
      {article && (
        <div className="">
          <div className="article-image">
            <img src={article.imageUrl} alt={article.title} />
            <div className="likes">
              <div>
                {user && <Likes id={id} likes={article.likes} />}
                <p>{article.likes.length}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="title-description">
              <h2>{article.title}</h2>
              <p>Author: {article.createdBy}</p>
              <p>Posted on: {article.createdAt.toDate().toDateString()}</p>
              <hr />
              <h4>{article.description}</h4>
            </div>

           

            {/* Comments */}
            <Comment id={article.id}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
