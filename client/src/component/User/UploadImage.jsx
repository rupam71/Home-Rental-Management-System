import React,{useState} from 'react';
import { uploadProfileImage, profileImageUrl } from './../../actions/index';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import ReactCorp from "react-image-crop"
import { useDispatch } from 'react-redux';

const UploadImage = () => {
    const dispatch = useDispatch()
    const [link, setlink] = useState('');
    //save the image that used to be crop
    const [image, setImage] = useState(null);//change the aspect ratio of crop tool as you preferred
    const [crop, setCrop] = useState({aspect:16/16,maxWidth:300,maxHeight:300});//save the resulted image
    const [result,setResult] = useState(null);

    const handlePreview = (e) => {
        const localImageUrl = window.URL.createObjectURL(e.target.files[0])
        setlink(localImageUrl)
    }
    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

             const base64Image = await canvas.toDataURL("image/jpeg", 1);
            setResult(base64Image);
        } catch (e) {
            console.log("crop the image");
        }
    };
    const handleUpload = async() => {
        const blob = await axios.get(result,{responseType: 'blob',contentType: "image/jpeg"}).then(r => r.data);
        var blobFile = await blob.slice(0,blob.size,'image/jpeg')
        var newFile = await new File([blobFile], 'name.jpeg', {type:'image/jpeg'})

        await Resizer.imageFileResizer(
            newFile,
                300,
                300,
                "jpeg",
                100,
                0,
                 (uri) => {
                    console.log('uri')
                    const localImageUrl = window.URL.createObjectURL(uri)
                    console.log("Local Image Url ::: ",localImageUrl)
                    dispatch(profileImageUrl(localImageUrl))
    
                    const formData = new FormData();
                    formData.append('profilePicture',uri);
                    dispatch(uploadProfileImage(formData))
                },
                "file",
                300,
                300
              );
    }

    return  <div style={{border:'2px solid red',padding:'1rem 1rem 3rem 1rem',margin:'5% 10%'}}> 
    <h2 className='my-3'>Change Profile Picture</h2>
    <form encType="multipart/form-data" >
        <input type="file" onChange={handlePreview}
        className="form-control-file" name='profilePicture'/>
        </form>
        {link && (<div>
            <ReactCorp src={link} crop={crop} onChange={setCrop}
            onImageLoaded={setImage} /> <br/>
            <button className="btn btn-primary text-center btn-lg my-3" onClick={getCroppedImg}>
                <a href='#preview' style={{textDecoration:'none',color:'white'}}>
                    Crop
                </a>
            </button>
        </div> )}
        {result && ( <div className='text-center' id='preview'>
                <h2 >Preview Croped Image</h2>
                <img src={result} alt="cropped photos"/><br/>
                <button onClick={handleUpload} className="btn btn-default btn-lg my-3">Submit</button>
            </div>
        )}
    </div>
}

export default UploadImage