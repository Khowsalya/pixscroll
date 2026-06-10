import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  IndividualFeed  from "../Components/Feed/IndividualFeed";


function  ImageDetails(){
    // const {id} = useParams();
    const {id} = useLocation().state;
    console.log("id from params", id);

    return(
        
        <IndividualFeed id={id} />
    )
}

export default ImageDetails;