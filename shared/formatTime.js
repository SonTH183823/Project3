import moment from "moment";

export const formatTime = (time) =>{
    return moment(time * 1000).format('L');
}