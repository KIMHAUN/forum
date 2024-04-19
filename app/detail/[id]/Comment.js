'use client'
import { useEffect, useState } from "react"

export default function Comment(props) {
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])

    useEffect(()=>{
        fetch('/api/post/comment?parent_id=' + props.parent_id)
        .then((r)=> r.json())
        .then((result)=>{           
            //state함수는 늦게 실행됨.
            console.log(result)
            setData(result)
            console.log(data)         
          }).catch((error)=>{
            //인터넷문제 등으로 실패시 실행할코드
            console.log(error)
          })
    }, [])
    
    console.log('댓글 목록 ::: ' + JSON.stringify(data))
    
    let result = {}
    result.parent_id = props.parent_id
    result.content = comment
    return (
        <div>
            {
                data.length > 0 ? 
                data.map((a, i) => {
                    return(
                    <p key={i}>{a.content} </p>
                    )
                }) : '댓글 없음'  
            }           

{ 
           data.length > 0 ?
           data.map((a,i)=>
             <p key={i}>{a.content}</p>
           )
           : '댓글없음'
        }
            <input onChange={(e)=>{
                setComment(e.target.value)
            }}name=""/>
            <button onClick={()=>{
                fetch('/api/post/comment', {method: 'POST', body: JSON.stringify(result)})                
            }
            }>댓글 전송</button>
        </div>
    )
}