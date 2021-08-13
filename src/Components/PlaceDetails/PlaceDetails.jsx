import React from "react";
import {Box, Typography, Button, Card, CardMedia, CardContent, Chip} from "@material-ui/core";
import {CardActions} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import LanguageIcon from '@material-ui/icons/Language';

import useStyles from "./style";

function PlaceDetails(props){

   const classes = useStyles();

   if(props.selected) (props.refProp)?.current?.scrollIntoView({behavior:"smooth",block:"start"})

   return (
      <Card elevation={6}>
         <CardMedia
            style={{height:250}}
            image={props.place.photo ? props.place.photo.images.large.url:"https://www.sydney.com/sydney-life/wp-content/uploads/2015/06/Park-Hyatt-The-Dining-Room.jpg"}
            title={props.place.name}      
         />
         <CardContent>
            <Typography gutterBottom variant="h5">{props.place.name}</Typography>
            <Box display="flex" justifyContent="space-between">
               <Rating size="small" value={Number(props.place.rating)} readonly/>
               <Typography gutterBottom variant="subtitle1">out of {props.place.num_reviews} reviews</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
               <Typography variant="subtitle1">Price</Typography>
               <Typography gutterBottom variant="subtitle1">{props.place.price_level}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
               <Typography variant="subtitle1">Ranking</Typography>
               <Typography gutterBottom variant="subtitle1">{props.place.ranking}</Typography>
            </Box>
            {/*place?.map((award)=>
               <Box my={1} display="flex" justifyContent="space-between" alignContent="center">
                  <img src={award.image.small} alt={award.display_name} />
                  <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
               </Box>
            )*/}
            {props.place?.address && (
               <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                  <LocationOnIcon /> {props.place.address}
               </Typography>
            )}
            {props.place?.phone && (
               <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                  <PhoneIcon /> {props.place.phone}
               </Typography>
            )} 
            <CardActions>
               <Button size="small" color="primary" onClick={()=>window.open(props.place.web_url,'_blank')}>
                  Trip
               </Button>
               <Button size="small" color="primary" onClick={()=>window.open(props.place.website,'_blank')}>
                  <LanguageIcon />
               </Button>
            </CardActions>
         </CardContent>
      </Card>
   );
}

export default PlaceDetails; 