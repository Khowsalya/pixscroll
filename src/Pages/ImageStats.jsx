import ImageStatsPage from "../Components/Feed/ImageStatsPage";
import { useLocation } from "react-router-dom";

function ImageStats(){
    const location = useLocation();
        const {id} = location.state || {};
        console.log("Received ID in ImageStats component:", id);

    return(
        <>
        <ImageStatsPage id={id} />
        </>
    )
}

export default ImageStats;