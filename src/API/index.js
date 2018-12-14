class Helper {
    static baseURL(){
        return "https://api.foursquare.com/v2"
    }
    static auth(){
        const keys = {
            client_id:"PFDB3LZGGOWV2DSWRJ2C22ETWYKQPBE2XYYDHABCV0YVUAV3",
            client_secret:"JCDVOB2ODKQDNP33YN352JX5IO0KPJJXNGYTFFMMNDFZNWB5",
            v:"20181213"
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }
    static urlBuilder(urlPrams){
        if (!urlPrams){
            return""
        }
        return Object.keys(urlPrams)
            .map(key =>`${key}=${urlPrams[key]}`)
            .join("&");
    }
    static headers(){
        return{
            Accept:"application/json"
        };
    }
    static simpleFetch(endPoint,method,urlPrams){
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlPrams
        )}`,
            requestData
        ).then(res => res.json());
    }
}
export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/explore","GET",urlPrams);
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET")
    }
    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET");
    }
}