import React from 'react';
import Blogs from './Blogs';
import AddBlog from './AddBlog';

const Blog = () => {
  return (
    <div className="row" style={{border:"2px solid black",display:"flex"}}>
       <div>Check</div>
        <Blogs/>
        <AddBlog/>
    </div>
  )
}

export default Blog