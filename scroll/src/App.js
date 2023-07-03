import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {
  const [posts , setPosts] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0)
  const [pageNumber, setPageNumber]= useState(0)
  useEffect(()=>{
    const fetchApiPosts = async ()=>{
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers)
      console.log(res.data.data);
      setPosts(res.data.data);

    }
    fetchApiPosts()
  },[])

  const fetchData = ()=>{
    setPageNumber( pageNumber +1)
    const fetchApiPosts = async ()=>{
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers)
      console.log(res.data.data);
      setPosts(posts.concat(res.data.data));

    }
    fetchApiPosts()
  }

  return (
    <div>
      <h1 className='m-5 text-center'>Scroll Infinity</h1>
      <div>
        <div className='col-4 m-auto'>
          {posts.map((post, index)=>(
            <div  className="alert alert-info" key={index}>
              <span>Id {post._id}</span>
              <p>Name {post.name}</p>
              <p>Country {post.airline[0].country}</p>
              <p>Country {post.airline[0].name}</p>          
            </div>
          ))}
        </div>
        <InfiniteScroll
            className='text-center'
            dataLength={posts.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >         
          </InfiniteScroll>
      </div>
    </div>
  )
}

export default App
