import {v2 as cloudinary} from 'cloudinary'

const imageToCludinary = () =>{
    cloudinary.config({ 
        cloud_name: 'datfsi8k1', 
        api_key: '993136734931345', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
}