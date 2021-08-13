import axios from "axios";

export async function getPlacedata(type,bound){

    const URL =`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

    console.log(URL);
    try{
        const {data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
              bl_latitude: bound.sw.lat,
              tr_latitude: bound.ne.lat,
              bl_longitude: bound.sw.lng,
              tr_longitude: bound.ne.lng,
            },
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
    }
    catch(error)
    {
        console.log(error);
    }

}