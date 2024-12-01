import React, { useState } from 'react'
import styled from "styled-components"

export default function Profile({}) {
  const [UserData,serUserData] =useState(JSON.parse(localStorage.getItem('UserData')))
  console.log()
  return (
    <Container>
      <div className="Container">
        <div className="userPic">
        <img src={UserData.UploadImage} width="250px" alt="" />
        </div>
        <div className="userDetails">
        <div className="inputtext">
          <input type="text" disabled name="Username" value={`Name: ${UserData.Username}`}/>
          </div>
          <div className="inputtext">
          <input type="text" disabled name='Email' value={`Email-Id: ${UserData.Email}`}/>
          </div>
          <div className="button">
          <input type="button" className='Edit' value="Edit" />
          </div>
        </div>
      </div>
    </Container>
  )
}
const Container=styled.div`
.Container{
    height: 76vh;
    width: 34vw;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -3px -3px 7px #ffffffb2, 3px 3px 7px rgba(94, 104, 121, 0.945);
    background-color: aliceblue;
    border-radius: 5px;
    position: relative;
}
.userPic img{
   height: 40vh;
    width: 31vw;
    position: absolute;
    top: 30px;
    padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    border-top: 1px solid rgba(255, 255, 255, .3);
    border-left: 1px solid rgba(255, 255, 255, .3);
    right: 22px;
    border-radius: 13px;
    background: #797272;
}
.userDetails{
    height: 24vh;
    width: 31vw;
    position: absolute;
    bottom:20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}
.Edit{
    width: 8vw;
    background-color: #5699ff;
    font-size: 24px;
    font-weight: 50;
    border: 3px solid #b3b7ff;
    cursor: pointer;
    border-radius: 10px;
    color: #e9c2c2;
}
.Edit:hover{
    background-color: #2f6ac3;
    font-size: 28px;
    border: 3px solid #1b22ab;
    color: #e9c2c2;
}
.button{
    height: 7vh;
    width: 9vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputtext{
    // border: 2px solid;
    width: 19vw;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputtext input{
   height: 4vh;
    width: 18vw;
    border: none;
    border-bottom: 2px solid;
    outline: none;
    background: aliceblue;
    color: #797272;
    font-weight: 700;
    font-size: 15px;
    }
`
