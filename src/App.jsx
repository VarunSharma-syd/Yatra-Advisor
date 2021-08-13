import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";

import { getPlacedata } from "./Api";
import { useState } from "react";

function App(){
    
    const [places, setPlaces] = React.useState([]);

    const [childClicked, setChildClicked] = React.useState(null);

    const [coordinates, setCoordinates] = React.useState({});
    const [bound, setBound] =React.useState(null);

    const [isLoading,setIsLoading] = React.useState(false);

    const [type, setType] = React.useState("restaurants");
    const [rating, setRating] = React.useState('select');
    const [filteredPlaces,setFilteredPlaces] = React.useState([]);

    //run only first time
    React.useEffect(()=> {
        //browser function to get current location on first time
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});
        })
    },[]);

    React.useEffect(()=>{
        const filteredPlaces= places.filter((place)=>place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    },[rating])

    React.useEffect(()=>{
            setIsLoading(true);
            getPlacedata(type,bound)
                .then((data)=>{
                    console.log(data);
                    setPlaces(data);
                    setFilteredPlaces([])
                    setIsLoading(false);
                })
    },[type,coordinates, bound]);   //Dependecy array it will change(render) automatically when coordinates,type or bound changes


    return (
        <>
        <CssBaseline />
        <Header 
        setCoordinates={setCoordinates}
        />
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                places={filteredPlaces.length ? filteredPlaces: places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />    
            </Grid>    
            <Grid item xs={12} md={8}>
                <Map 
                 place = {filteredPlaces.length ? filteredPlaces: places}
                 setCoordinates={setCoordinates}
                 setBound={setBound}
                 coordinates={coordinates} 
                 setChildClicked={setChildClicked}
                 />
            </Grid>
        </Grid>
        </>
    );
}

export default App;