import React, { createRef } from "react";

import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import useStyles from "./style";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

function List(props){

    const classes = useStyles();
    // const [type, setType] = React.useState("restaurants");
    // const [rating, setRating] = React.useState('select');

    const [elRefs, setElRefs] = React.useState([]);

    const places = props.places;

    React.useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
        setElRefs(refs);
    },[places]);

    function handleType(event){
        props.setType(event.target.value);
    }

    function handleRating(event){
        props.setRating(event.target.value);
    }

;    return(
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotel and Attractive Places</Typography>
            {props.isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ): (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={props.type} onChange={handleType}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotel</MenuItem>
                    <MenuItem value="attractions">Attractive Places</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={props.rating} onChange={handleRating}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {props.places?.map((place,i)=> (
                    <Grid  ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                        place={place}
                        selected={Number(props.childClicked)===i}
                        refProp={elRefs[i]}
                        />
                    </Grid>    

                ))}
            </Grid> 
            </>
            )}   
        </div>
    );
}

export default List; 