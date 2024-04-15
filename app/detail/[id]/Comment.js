'use client'


import { useEffect, useState } from "react"

export default function Comment(props) {
    let [comment, setComment] = useState('')
    let [comments, setComments] = useState([])

    useEffect(()=>{
        fetch('/api/post/comment', {parent_id: props.parent_id}).then(res => {
            
            setComments(res)
            console.log(res);
        })
        
 
    }, [])
    
    //console.log('댓글 목록 ::: ' + props.comments);
    //comments = props.comments
    let result = {}
    result.parent_id = props.parent_id
    result.content = comment
    return (
        <div>
            <div>
                {
                    comments.map((a, i) => {
                        <div>{a.content}</div>
                    })
                   
                }

            </div>
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