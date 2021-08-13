import React from "react";

import GoogleMapReact from "google-map-react";
import {Paper, Typography, useMediaQuery } from "@material-ui/core"; //useMediaQuery mobile responsive
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./style";

function Map(props){

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
   
    return (
        <div className={classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
            defaultCenter={props.coordinates}
            center={props.coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={""}
            onChange={(event)=>{ 
                console.log(event);
                props.setCoordinates({lat:event.center.lat,lng:event.center.lng});
                props.setBound({ne:event.marginBounds.ne, sw:event.marginBounds.sw});
            }}
            onChildClick={(child)=>props.setChildClicked(child)}
        >
            {props.place?.map((place,index)=> (
                <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}                
                key={index}
                >
                {
                    !isDesktop ? (
                        <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                    ) : (
                        <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.typogrphy} variant="subtitle2" gutterBottom>
                                {place.name}
                            </Typography>
                            <img 
                            src= {place.photo ? place.photo.images.large.url:"https://www.sydney.com/sydney-life/wp-content/uploads/2015/06/Park-Hyatt-The-Dining-Room.jpg"}
                            alt= {place.name}
                            />
                            <Rating size="small" value={Number(place.rating)} readonly/>
                        </Paper>
                    )
                }
                </div>
            ))
        } 
        </GoogleMapReact>
        </div>
    );
}

export default Map; 
