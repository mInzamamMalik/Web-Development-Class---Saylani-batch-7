import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios';
                                      
function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
      .then(res => {
        const newPosts = res.data.data.children
          .map(obj => obj.data);

        setPosts(newPosts);
      });
    return () => {
      console.log("unloaded")
    };
  }, []);

  return (
    <div>
      {posts.length === 0 ? <h1>Loading...</h1> : null}
      {posts.map((eachItem, index) => (
        <p key={index}>
          <b> {eachItem.id}: </b>
          {eachItem.title}
        </p>
      ))}
    </div>
  );
}
export default App;
