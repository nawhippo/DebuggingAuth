import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../header";
import validator from "validator";
import { postReq } from "../../services/api";
import { Navigate } from "react-router-dom"

const defaultTheme = createTheme();

export default function ResetPassword() {

    const [formData, setFormData] = useState({
        email: ""
    });
    const [validEmailErr, setValidEmailErr] = useState(null);

    const [renderMsg, setRenderMsg] = useState(false);
    const [nav, setNav] = useState(null);

    const handleInputChange = (event) => {
        const { name,value } = event.target;
        setFormData((prevFormData) => {
            return {...prevFormData, [name]: value};
        });
        setValidEmailErr(null);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(validator.isEmail(formData.email)){
            
            console.log(formData);
            const headers = {};
            const response = await postReq("/auth/passwordReset", headers, formData);
            console.log(response);
            setFormData({
                email: ""
            });

            setRenderMsg(true);
            
        }else{
            setValidEmailErr("Not a valid email");
        }
    };

    if (renderMsg) {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Header />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >   
                        <Typography component="h1" variant="h5">
                            Please check your email for further instructions...
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }

    if(nav) {
        return (
            <Navigate to={nav} />
        )
    }
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Password Reset
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                            error={validEmailErr !== null}
                            helperText={validEmailErr}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Request Email
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="" variant="body2" onClick={() => setNav("/login")}>
                                    Login
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => setNav("/signup")} >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
};