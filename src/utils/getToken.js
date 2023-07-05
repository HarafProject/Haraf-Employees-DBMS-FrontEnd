import {useState} from 'react'
import { useDispatch,useSelector } from "react-redux";

export default function GetToken() {
 const [token,setToken] = useState()
 useSelector((state)=>{
    if(state.user.user){
        setToken(state.user.user)
    }
    console.log(state.user.user,'state')
  })
  return token
}
