import React, { useState } from "react";
import {Autocomplete} from "@react-google-maps/api";

import Appbar from '@material-ui/core/AppBar';

import {Toolbar, Typography, InputBase, Box} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./style";


function Header(props){
    const classes = useStyles(); 
    const [autoComplete, setAutoComplete] = React.useState(null);

    const onLoad =(autoC)=> {
        setAutoComplete(autoC);
        console.log({autoC});
    }

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        props.setCoordinates({lat,lng});
    }
    return (
        <Appbar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
                Welcome To Yatra Advisor
            </Typography>
            <Box display="flex">
                <Typography variant="h6" className={classes.title}>
                    Explore New Places
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search ..." classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                    </div>
                </Autocomplete>
            </Box>
        
        </Toolbar>
        </Appbar>
    )
}

export default Header;