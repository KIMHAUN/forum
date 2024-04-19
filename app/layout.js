import { Inter } from "next/font/google";
import "./globals.css";
import LoginBtn from './LoginBtn' 
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import { cookies } from "next/headers"; 
import LogOutBtn from "./LogOutBtn";
import ModeChange from "./ModeChange";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions)
  //cookie : server componemt // localstorage : client component
  let mode = cookies().get('mode')
  //console.log(mode.value)
  //console.log(session.user.name)
  return (
    <html lang="en">
  
      <body className={ mode != undefined && mode.value == 'dark' 
      ? "dark-mode" 
      : ''}>
      <div className="navbar"> 
        <Link href="/" className="logo">My Next Level forum</Link> 
        <Link href="/list">List</Link> 
        <Link href="/write">Write</Link>
        {
          session? <span>{session.user.name} <LogOutBtn></LogOutBtn></span>
          : <LoginBtn></LoginBtn>
        }
        <ModeChange/>

        {/* {session==null?<LoginBtn/>  : session.user.name} */}
        {/* <div onClick={()=>{
            console.log('mode change')
        }}> */}
        </div>
        
        {children}</body>
    </html>
  );
}
