import React from "react";
import { useState, useEffect } from "react";
//get article from databse
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
//get db from firebase
import { db } from "../firebaseConfig";
import DeleteBlog from "./DeleteBlog";

const Blogs = () => {
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
        <p className="border mt-3 p-3 bg-light">No articles Found here</p>
      ) : (
        // here we did destructuring 
        articles.map(({id,imageUrl,title,description,createdAt}) => (
          <div className="border mt-3 p-3 bg-light" key={id}>
            <div className="row">
                <div className="col-3">
                    <img src={imageUrl} alt={title} style={{height:180, width:180}}/>

                </div>
                <div className="col-9 ps-3">
                    <h2>{title}</h2>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <h4>{description}</h4>

                    <DeleteBlog id={id} imageUrl={imageUrl}/>

                </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
