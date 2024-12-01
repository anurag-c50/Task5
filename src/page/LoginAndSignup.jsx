import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'

export default function LoginAndSignup() {
    const navigate=useNavigate()
    const ImageRef=useRef()
    const [tempdata,setTempdata]=useState(() => {
        const data = JSON.parse(localStorage.getItem('UserData'));
        return data || undefined;
      })
    const [ImagePreview,setImagePreview]=useState()
    const [ImageButtonName,setImageButtonName]=useState("Please Select Profile Pic")
    const [LoginData,setLoginData]=useState({
        Email:"",
        Password:""
    })
    const [isImageSelected,setIsImageSelected]=useState(false)
    const [SignupData,setSignupData]=useState({
        Username:"",
        Email:"",
        Password:"",
        ConfirmPassword:"",
        UploadImage:""

    })
    const [Error,setError]=useState({
        Error1:{err:"",check:false},
        Error2:{err:"",check:false},
        Error3:{err:"",check:false},
        Error4:{err:"",check:false},
        Error5:{err:"",check:false}
    })
    const LoginHandler=(e)=>{
        setLoginData({...LoginData,[e.target.name]:e.target.value})
        setError({
            Error1:{err:"",check:false},
            Error2:{err:"",check:false},
            Error3:{err:"",check:false},
            Error4:{err:"",check:false},
            Error5:{err:"",check:false}
        });
    }
    let image
    const SingupHandler=(e)=>{
        var username= /^[a-zA-Z]+$/;
        if (e.target.name === "UploadImage") {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                setSignupData({ ...SignupData, UploadImage: base64String });
                setIsImageSelected(true);
                setImageButtonName(file.name);
            };
            reader.readAsDataURL(file);
        }
          else if(e.target.name==="Username"){
            console.log(username.test(e.target.value))
            if(username.test(e.target.value)){
                setSignupData({ ...SignupData, [e.target.name]: e.target.value });
            }
          }else{
            setSignupData({ ...SignupData, [e.target.name]: e.target.value })    
        }
        setError({
            Error1:{err:"",check:false},
            Error2:{err:"",check:false},
            Error3:{err:"",check:false},
            Error4:{err:"",check:false},
            Error5:{err:"",check:false}
        });
    }
    const SignupValidation = () => {
        var emailRegex =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(SignupData.Username===""){
            setError({ ...Error, Error1: { err: 'Empty Username', check: true } });
            return false;
        }
        if(SignupData.Email===""){
            setError({ ...Error, Error2: { err: 'Empty Email', check: true } });
            return false;
        }
        if(SignupData.Password===""){
            setError({ ...Error, Error3: { err: 'Empty Password', check: true } });
            return false;
        }
        if(SignupData.ConfirmPassword===""){
            setError({ ...Error, Error4: { err: 'Empty ConfirmPassword', check: true } });
            return false;
        }
        if(SignupData.UploadImage===""){
            setError({ ...Error, Error5: { err: 'Empty UploadImage', check: true } });
            return false;
        }
        if (SignupData.Username.length<3) {
            setError({ ...Error, Error1: { err: 'Username should be greater than 3 characters', check: true } });
            return false;
        }
        if (SignupData.Email && !emailRegex.test(SignupData.Email)) {
            setError({ ...Error, Error2: { err: 'Invalid Email', check: true } });
            return false;
        }
        if (SignupData.Password.length < 8) {
            setError({ ...Error, Error3: { err: 'Password should be at least 8 characters', check: true } });
            return false;
        }
        if (SignupData.ConfirmPassword.length < 8) {
            setError({ ...Error, Error3: { err: 'Password should be at least 8 characters', check: true } });
            return false;
        }
        if (SignupData.Password !== SignupData.ConfirmPassword) {
            setError({ ...Error, Error3: { err: 'Passwords do not match', check: true },Error4: { err: 'Passwords do not match', check: true } });
            return false;
        }
        setError({
            Error1:{err:"",check:false},
            Error2:{err:"",check:false},
            Error3:{err:"",check:false},
            Error4:{err:"",check:false},
            Error5:{err:"",check:false}
        });
        return true;
    }
    const LoginValidation = () => {
        var usernameRegex= /^[a-zA-Z]+$/;
        var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if (LoginData.Email==="") {
            setError({ ...Error, Error1: { err: 'Empty Email', check: true } });
            return false;
        }
        if (LoginData.Password==="") {
            setError({ ...Error, Error2: { err: 'Empty Password', check: true } });
            return false;
        }
        if(tempdata.Email!==LoginData.Username&&tempdata.Password!==LoginData.Password){
            setError({ ...Error,Error1: { err: 'Invalid Credentials', check: true } , Error2: { err: 'Invalid Credentials', check: true } });
            return false;
        }
        setError({
            Error1:{err:"",check:false},
            Error2:{err:"",check:false},
            Error3:{err:"",check:false},
            Error4:{err:"",check:false},
            Error5:{err:"",check:false}
        });
        return true;
    }
const LoginSubmit=(e)=>{
    e.preventDefault()
    if(LoginValidation()){
        navigate('/profile')
    }
}
    const SignupSubmit=(e)=>{
        e.preventDefault()
        if(SignupValidation()){
            setChangeLoginToSignup(!ChangeLoginToSignup)
            localStorage.setItem('UserData', JSON.stringify(SignupData));
            setIsImageSelected(false)
            setSignupData({Username:"",Email:"",Password:"",ConfirmPassword:""})
        }
    }
    const [ChangeLoginToSignup,setChangeLoginToSignup]=useState(false)
    const ChangeLoginSignup=()=>{
        setChangeLoginToSignup(!ChangeLoginToSignup)
    }
    const [ShowPassowrd,setShowPassword]=useState({
        ShowPassword1:{icon:"fa fa-eye",type:"password"},
        ShowPassword2:{icon:"fa fa-eye",type:"password"},
        ShowPassword3:{icon:"fa fa-eye",type:"password"}
    })
    const ChangePasswordicon=(e)=>{
        if(e.target.dataset.name==='password1'){
            if(ShowPassowrd.ShowPassword1.type==="password"){
            setShowPassword({...ShowPassowrd,ShowPassword1:{icon:'fa fa-eye-slash',type:'text'}});
            }else{
                setShowPassword({...ShowPassowrd,ShowPassword1:{icon:"fa fa-eye",type:"password"}});
            }
        }else if(e.target.dataset.name==='password2'){
            if(ShowPassowrd.ShowPassword2.type==="password"){
            setShowPassword({...ShowPassowrd,ShowPassword2:{icon:'fa fa-eye-slash',type:'text'}});
            }else{
                setShowPassword({...ShowPassowrd,ShowPassword2:{icon:"fa fa-eye",type:"password"}});
            }
        }else{
            if(ShowPassowrd.ShowPassword3.type==='password'){
            setShowPassword({...ShowPassowrd,ShowPassword3:{icon:'fa fa-eye-slash',type:'text'}});
            }else{
                setShowPassword({...ShowPassowrd,ShowPassword3:{icon:"fa fa-eye",type:"password"}});
            }
        }
    } 
    const TakeImage=(e)=>{
        e.preventDefault()
        ImageRef.current.click()
    }
  return (
    <Container><div className={`${ChangeLoginToSignup?"Container Change":"Container"}`}>
        <form className={`form ${ChangeLoginToSignup&&"login"}`}>
            <div className="title"><h1>Login</h1></div>
            <div className="input-icons">
            <i class="fa fa-envelope icon"></i>        
            <input className="input-fields " value={LoginData.Email} maxLength={30} onChange={(e)=>{LoginHandler(e)}} name="Email" type="email" placeholder='Email' required={true}/>
            <span>{Error.Error1.check&&Error.Error1.err}</span>
            </div>
            <div className="input-icons">
            <i class="fa fa-lock icon"></i>
            <span className='lock'><i className={`${ShowPassowrd.ShowPassword1.icon} icons`} data-name="password1" onClick={(e)=>ChangePasswordicon(e)}></i></span>
            <input className="input-field" value={LoginData.Password} maxLength="20" onChange={(e)=>{LoginHandler(e)}} name="Password" type={ShowPassowrd.ShowPassword1.type} placeholder='Password' required={true}/>
            <span>{Error.Error2.check&&Error.Error2.err}</span>
            </div>
            <div className="pass-link">
            <a href >Forgot password?</a>
            </div>
            <div className="field">
              <input type="submit" onClick={(e)=>{LoginSubmit(e)}} className="button" id="input" value="Login"></input>
            </div>
            <div className="signup-link" onClick={()=>{ChangeLoginSignup()}}>Not a member?
              <a href >Sign Up</a>
            </div>
        </form>
         <form className={`form ${!ChangeLoginToSignup?"signup":"signupon"}`}>
         {isImageSelected&&<div className="avatar">
            <img src={SignupData.UploadImage} width="250px" alt="" /></div>}
            <div className="title"><h1>Signup</h1></div>
            <div className="input-icons">
            <i class="fa fa-user icon"></i>
            <input className="input-field" value={SignupData.Username} maxLength={20} onChange={(e)=>{SingupHandler(e)}} name="Username" type="text" placeholder='UserName' required={true}/>
            <span>{Error.Error1.check&&Error.Error1.err}</span>
            </div>
            <div className="input-icons">
            <i class="fa fa-envelope icon"></i>        
            <input className="input-fields " value={SignupData.Email} maxLength={30} onChange={(e)=>{SingupHandler(e)}} name="Email" type="email" placeholder='Email' required={true}/>
            <span>{Error.Error2.check&&Error.Error2.err}</span>
            </div>
            <div className="input-icons">
            <i class="fa fa-lock icon"></i>
            <span className='lock'><i className={`${ShowPassowrd.ShowPassword2.icon} icons`} data-name="password2" onClick={(e)=>ChangePasswordicon(e)}></i></span>
            <input className="input-field" value={SignupData.Password} maxLength={20} onChange={(e)=>{SingupHandler(e)}} name="Password" type={ShowPassowrd.ShowPassword2.type} placeholder='Create Password' required={true}/>
            <span>{Error.Error3.check&&Error.Error3.err}</span>
            </div>
            <div className="input-icons">
            <i class="fa fa-lock icon"></i>
            <span className='lock'><i className={`${ShowPassowrd.ShowPassword3.icon} icons`} data-name="password3" onClick={(e)=>ChangePasswordicon(e)}></i></span>
            <input className="input-field" maxLength={20} value={SignupData.ConfirmPassword} onChange={(e)=>{SingupHandler(e)}} name="ConfirmPassword" type={ShowPassowrd.ShowPassword3.type} placeholder='Confirm Password' required={true}/>
            <span>{Error.Error4.check&&Error.Error4.err}</span>
            </div>
            <input name="UploadImage" className='fileinput'ref={ImageRef} type="file" id=""  onChange={(e)=>{SingupHandler(e)}}/>
            <div className="imagebutton"><input className='TakeImage' type="button" onClick={(e)=>{TakeImage(e)}}value={ImageButtonName} />
            </div>
            <span>{Error.Error5.check&&Error.Error5.err}</span>
            <div className="field">
              <input type="submit" onClick={(e)=>{SignupSubmit(e)}}  className="button" id="input" value="Signup"></input>
            </div>
            <div className="signup-link">Already have an account?
              <a href onClick={()=>{ChangeLoginSignup()}}>Login</a>
            </div>
        </form> 
      </div></Container>
  )
}
const Container = styled.div`
.Container{
    height: 60vh;
    width: 29vw;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -3px -3px 7px #ffffffb2, 3px 3px 7px rgba(94, 104, 121, 0.945);
    background-color: aliceblue;
    border-radius: 5px;
    position: relative;
}
    .Change{
    height: 73vh;
    width: 29vw;
    }
.TakeImage{
width: 13vw;
    height: 4vh;
    background-color: #cae0ff;
    font-size: 16px;
    color: #716565;
    font-weight: 50;
    border: none;
    cursor: pointer;
    box-shadow: none;
    border-radius: 6px;
}
    .TakeImage:hover{
    font-size: 18px;
    }
.form{
    height: 58vh;
    width: 26vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.title{
    position: relative;
    bottom: 28px;
    color: #797272;
}
        .input-icons {
             width: 100%;
height: 9vh;        }

        .input-icons i {
            position: absolute;
                color: #909090;
        }

        .icon {
        min-width: 33px;
    padding: 14px 0px 0px 7px;
        }
    .icons{
     min-width: 33px;
    padding: 14px 0px 0px 7px;
    }
        .input-field {
           width: 100%;
    height: 6vh;
    padding-left: 22px;
    border: 2px solid #7d8d97;
    border-radius: 7px;
     color: #797272;
         outline: none;
    font-size: 20px;
    font-weight: 549;
        border-bottom-width: 5px;
        } 
.pass-link{
color: #124fab;
}
input:focus{
    border-color:#5186a7;
    }
.pass-link:hover{
cursor: pointer;
    text-decoration: underline;
}
.field{
    height: 8vh;
    width: 19vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.field input{
    width: 16vw;
    height: 6vh;
    background-color: #2477f3;
    font-size: 24px;
    font-weight: 50;
    border: none;
    cursor: pointer;
    box-shadow: none;
    border-radius: 6px;
    color: #e4d4d4;
  } 
 .field input:hover{
  font-size: 30px;
    font-weight: 70;
    background-color:#124fab;
 }
      .signup-link {
color: #797272;
}  
    .signup-link a{
color: #124fab;
}
.signup-link a:hover{
cursor: pointer;
    text-decoration: underline;
}
.input-fields {
    width: 100%;
    height: 6vh;
    padding-left: 28px;
    font-size: 20px;
    font-weight: 549;
    border: 2px solid #7d8d97;
    border-radius: 7px;
    color: #797272;
    outline: none;
    border-bottom-width: 5px;
}
.signup{
position: absolute;
    right: 100px;
    visibility: hidden;
}
.signupon{
   height: 66vh;
    width: 26vw;
}
.login{
    position: absolute;
    left: 100px;
    visibility: hidden;
}
.lock{
    position: absolute;
    right: 53px;
    }
span{
color:red;
}
.avatar img{
    height: 11vh;
    position: relative;
    bottom: 24px;
    width: 6vw;
    border-radius: 50%;
      padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,.3);
    border-top: 1px solid rgba(255,255,255,.3);
    border-left: 1px solid rgba(255,255,255,.3);
}
.fileinput{
display:none;
}
.imagebutton{
    width: 17vw;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
 `