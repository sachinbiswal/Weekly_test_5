import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Post() {
    const [state, setState] = useState([]);
  const [page, setPage] = useState(0);


  useEffect(() => {
    const timer = setInterval(fetchData, 10000); 
    return () => clearInterval(timer); 
  });

  const fetchData = () => {
       axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
       .then((res)=>{
            setState((prevState) => [...prevState, ...res.data.hits]);
            setPage(page+1);
            console.log('fetch test code');
      })  
  };

  return (
    <div>
        <h1 style={{textAlign:'center',color:'red'}}>Polling App</h1>
      <h3 style={{textAlign:'center'}}>Total Pages: {page}</h3>
      {
        state.length > 0 ? 
        
        <table border={'all'} style={{marginLeft:'50px',marginRight:'50px'}}>
        
        <thead>
          <tr>
            <th style={{fontSize:'large',background:'black',color:'white'}}>Title</th>
            <th style={{fontSize:'large',background:'black',color:'white'}}>URL</th>
            <th style={{fontSize:'large',background:'black',color:'white'}}>Created At</th>
            <th style={{fontSize:'large',background:'black',color:'white'}}>Author</th>
          </tr>
        </thead>
        <tbody>
          {state.map((data) => (
            <tr key={data.objectID}>
              <td>{data.title}</td>
              <td>
                <a href={data.url}>{data.url}</a>
              </td>
              <td>{data.created_at}</td>
              <td>{data.author}</td>
            </tr>
          ))}
        </tbody>
      </table>:<h2 style={{color:'red',textAlign:'center'}}>Nothing to Display</h2>
      }
    </div>
  )
}

export default Post