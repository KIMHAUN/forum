'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ModeChange() {
    let router = useRouter()
    let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
    useEffect(()=> {
        //let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
        //console.log(쿠키값)
        if (쿠키값 == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
        }        
    }, [])
    return (
        
        <span onClick={()=>{
            
            if (쿠키값 == 'light') {
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                router.refresh()

            } else {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                router.refresh()
            }
            
        }}
        
        >
        { 
            
            쿠키값 != '' && 쿠키값 == 'dark' ?
            <span>🌛</span> : <div>🌞</div>
        }  
        </span>
    )
}