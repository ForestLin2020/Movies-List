import React from 'react';
import { FaHeart, FaRegHeart } from '../../../node_modules/react-icons/fa';


// Input: liked: boolean
// Output: onClick 

const Like = (props) => {
    
    if (props.liked === true){
        return (<FaHeart onClick={props.onLikeHeart} style={{cursor:'pointer'}} /> );
    } else {
        return (<FaRegHeart onClick={props.onLikeHeart} style={{cursor:'pointer'}} />);
    }

}
 
export default Like;