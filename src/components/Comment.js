import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect,useState } from 'react'
import { db } from '../firebaseConfig'

const Comment = () => {
const [comments,setComments]=useState([]);

    useEffect(()=>{
        const docRef=doc(db,"Articles",id)
        onSnapshot(docRef,(snapshot)=>{
            setComments(snapshot.data().comments);
        })
    })
  return (
    <div>
        <div className='container'>

        </div>
    </div>
  )
}

export default Comment