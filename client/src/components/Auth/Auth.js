import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';


import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

const GOOGLE_CLIENT_ID='58161425273-p34g6rr2rhpq9fp5b9nob33gspvdd9oi.apps.googleusercontent.com'

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup,setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
        gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);
  }, []);

  const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);

const handleSubmit = (e)=>{
  e.preventDefault();
  if(isSignup)
  {
     dispatch(signup(formData,navigate));
  }
  else
  {
    dispatch(signin(formData));
  }

};

const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
};

const switchMode = ()=>{
  setisSignup((prevIsSignup)=>!prevIsSignup);
  setShowPassword(false); // Reseting the showPassword
}

const googleSuccess= async (res)=>{
    
  const result = res ? res.profileObj : null;
  const token = res ? res.tokenId : null;
  
  try {
    dispatch({type:'AUTH',data:{result,token}});
    navigate('/');
  } 
  catch (error) {
    console.log(error);
  }

}

const googleFailure=(error)=>{
  console.log(error);
  console.log('Google Sign In was unsuccessful. Try Again Later');
}

return (
  <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          </>
          )}
          
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>

        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps)=>(
            <Button 
            className={classes.googleButton} 
            color='primary' 
            fullWidth onClick={renderProps.onClick} 
            disabled={renderProps.disabled}
            startIcon={<Icon/>} 
            variant="contained"
            > 
            Google Sign In 
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign In' : " Don't have an account ? Sign Up "}
              </Button>
            </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
)
};

export default Auth;