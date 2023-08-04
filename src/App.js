// import "./App.css";
// import Blogs from "./components/Blogs";
// import AddBlog from "./components/AddBlog";

// function App() {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-8">
//           <Blogs />
//         </div>
//         <div className="col-md-4">
//           <AddBlog />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Blog from "./components/Blog";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import LogIn from "./auth/LogIn";
import BlogPage from "./components/BlogPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/blog/:id" element={<BlogPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
