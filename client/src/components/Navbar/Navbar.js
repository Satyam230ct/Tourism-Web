import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = ()=>{
        dispatch({type:'LOGOUT'});
        setUser(null);
        navigate(0);
    }

    console.log(user);

    useEffect(()=>{
        const token = user ? user.token : null;
        
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        
    },[location]);

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"> Travel Blog </Typography>
          <img className={classes.image} src={logo} alt="travel_logo" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            { user ? (
               <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6"> {user.result.name}  </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                        Logout
                    </Button>
               </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
    );
}

export default Navbar