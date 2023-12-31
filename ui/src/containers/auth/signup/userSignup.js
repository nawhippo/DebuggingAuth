// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import validator from "validator";
// import { postReq } from "../../../services/api";
// import { Navigate } from "react-router-dom";


// const defaultTheme = createTheme();

// export default function UserSignup(props) {

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         // role: "",
//         email: "",
//         password: "",
//         rePassword: ""
//     });

//     const [err, setErr] = useState({
//         roleErr: null,
//         validEmailErr: null,
//         passStrengthErr: null,
//         samePassErr: null
//     });

//     const [nav, setNav] = useState(null);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevFormData) => {
//             return { ...prevFormData, [name]: value };
//         });
//         setErr({
//             roleErr: null,
//             validEmailErr: null,
//             passStrengthErr: null,
//             samePassErr: null
//         });
//         setNav(null);
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(formData);
//         if (formData.role === "") {
//             setErr((prevErr) => {
//                 return { ...prevErr, "roleErr": "Please select a role" };
//             });
//         } else {
//             if (validator.isEmail(formData.email)) {
//                 if (validator.isStrongPassword(formData.password, {
//                     minLength: 8,
//                     minLowercase: 1,
//                     minUppercase: 1,
//                     minNumbers: 1,
//                     minSymbols: 1
//                 })) {
//                     if (formData.password === formData.rePassword) {

//                         const headers = {};
//                         const response = await postReq("/auth/signup", headers, formData);
//                         console.log(" RESPONSE IS FROM SUGNUP API- ", response);
//                         if (response.message === "User registered successfully") {

//                             setNav({
//                                 pathname: "/otp-verification",
//                                 state: { userId: response.userId }
//                             });

//                         } else if (response.message === "Email already in use") {
//                             setErr((prev) => {
//                                 return { ...prev, "validEmailErr": "Email already in use" }
//                             })
//                         }

//                     } else {
//                         setErr((prevErr) => {
//                             return { ...prevErr, "samePassErr": "The passwords does not match" };
//                         });
//                     }
//                 } else {
//                     setErr((prevErr) => {
//                         return { ...prevErr, "passStrengthErr": "Password should contain atleast 8 characters \n 1 lowercase letter \n 1 uppercase letter \n 1 numeric value and 1 symbol" };
//                     });
//                 }
//             } else {
//                 setErr((prevErr) => {
//                     return { ...prevErr, "validEmailErr": "Not a valid email" };
//                 });
//             }
//         }
//     };

//     if (nav == null) {
//         return (
//             <div className="Auth-form-container">
//                 <form className="Auth-form" onSubmit={handleSubmit}>
//                     <div className="Auth-form-content">
//                         <h3 className="Auth-form-title">Sign Up</h3>
//                         <div className="text-center">
//                             Already registered?{" "}
//                             <a className="link-primary" onClick={() => setNav("/login")} href="#">Login</a>
//                         </div>
//                         <div className="form-group mt-3">
//                             <label>First Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control mt-1"
//                                 placeholder="e.g Rohit"
//                                 name="firstName"
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="form-group mt-3">
//                             <label>Last Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control mt-1"
//                                 placeholder="e.g Sharma"
//                                 name="lastName"
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="form-group mt-3">
//                             <label>How do you want to Sign Up</label>
//                             <select
//                                 className="form-control mt-1"
//                                 name="role"
//                                 value={formData.role}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="">select a role</option>
//                                 <option value="client">Client</option>
//                                 <option value="professional">Professional</option>
//                             </select>
//                         </div>
//                         {err.roleErr === null ? null :
//                             <span style={{
//                                 color: 'darkred',
//                                 fontSize: 13,
//                             }}>{err.roleErr}</span>}
//                         <div className="form-group mt-3">
//                             <label>Email address</label>
//                             <input
//                                 type="text"
//                                 className="form-control mt-1"
//                                 placeholder="e.g abcd@example.com"
//                                 name="email"
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         {err.validEmailErr === null ? null :
//                             <span style={{
//                                 color: 'darkred',
//                                 fontSize: 13,
//                             }}>{err.validEmailErr}</span>}
//                         <div className="form-group mt-3">
//                             <label>New Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control mt-1"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         {err.passStrengthErr === null ? null :
//                             <span style={{
//                                 color: 'darkred',
//                                 fontSize: 13,
//                             }}>{err.passStrengthErr}</span>}
//                         <div className="form-group mt-3">
//                             <label>Confirm Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control mt-1"
//                                 placeholder="Comfirm Password"
//                                 name="rePassword"
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         {err.samePassErr === null ? null :
//                             <span style={{
//                                 color: 'darkred',
//                                 fontSize: 13,
//                             }}>{err.samePassErr}</span>}
//                         <div className="d-grid gap-2 mt-3">
//                             <button type="submit" className="btn btn-primary">
//                                 Sign me up!!
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         )
//     } else {
//         return (
//             <Navigate to={nav.pathname} state={nav.state} />
//         )
//     }
// };


import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function ProfessionalSignup({ formData, setFormData }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </Grid>
        </>
    );
}




