import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import ReactCorp from 'react-image-crop';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { showHouse, uploadHouseImages } from '../../actions/findHouse';
import { useDispatch,useSelector } from 'react-redux';
import { newError } from '../../actions/error';

const UploadHouseImage = () => {
    const dispatch =  useDispatch()
    const length = useSelector(state => state.house[0].houseImagesLength)
    
    const [houseImagesFormData, sethouseImagesFormData] = useState([])
    const [houseImagesLink, sethouseImagesLink] = useState([])
    const [link, setlink] = useState('');
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({aspect:16/9});
    const [result,setResult] = useState(null);
    // eslint-disable-next-line
    const [reRender,setreRender] = useState(null);

    const id = useParams().id

    useEffect(() => {
        dispatch(showHouse(id))
        dispatch(newError("Wait Some Time", "primary"))
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            if(length !== 0) {
                for (let i =0; i<length; i++){
                    const blob = await axios.get(`/api/house/${id}/picture/${i}`,{responseType: 'blob',contentType: "image/jpeg"}).then(r => r.data);
                    var blobFile = await blob.slice(0,blob.size,'image/jpeg')
                    var newFile = await new File([blobFile], 'name.jpeg', {type:'image/jpeg'})
                    houseImagesFormData.push(newFile)
                    const localImageUrl = window.URL.createObjectURL(newFile)
                    houseImagesLink.push(localImageUrl)
                }
                setTimeout(()=>{setreRender({})},5000)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [length]);

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
                    const localImageUrl = window.URL.createObjectURL(uri)
                    sethouseImagesLink(houseImagesLink.concat(localImageUrl))
                    setResult('')
                    setlink('')
                    setaddImageState(false)
    
                    sethouseImagesFormData(houseImagesFormData.concat(uri))
                },
                "file",
                300,
                300
              );
    }
    const removeImage = (img) => {
        const index = houseImagesLink.indexOf(img)
        sethouseImagesLink(houseImagesLink.filter(link=> link !== img))
        
        houseImagesFormData.splice(index, 1)
    }
    const [addImageState, setaddImageState] = useState(false);
    const addImageRender = () => {
        if(houseImagesLink.length===8) return <h3>You already upload 8 image. Please Submit this or delete some.</h3>
        else if(!addImageState) return <button className="btn btn-primary" onClick={e=>setaddImageState(true)}>+ Add Image</button>
        else return <div>
            <form encType='multipart/form-data'>
                    <input type='file' onChange={handlePreview} className="form-control-file my-3" name='houseImage'/>
                    </form>
                    {link && ( <div className='text-center'>
                        <ReactCorp src={link} crop={crop} onChange={setCrop}
                        onImageLoaded={setImage} /> <br/>
                        <button className="btn btn-primary text-center btn-lg my-3" onClick={getCroppedImg}>
                            <a href='#preview' style={{textDecoration:'none',color:'white'}}>
                                Crop
                            </a>
                        </button>
                        </div> )}
                    {result && ( <div className='text-center' id='preview'>
                        <h5 >Preview Croped Image</h5>
                        <img src={result} alt="House Photos"/><br/>
                        <button onClick={handleUpload} className="btn btn-default btn-lg my-3">
                        <a href='#addInQueue' style={{textDecoration:'none',color:'black'}}>
                                Add
                            </a>
                        </button>
                        </div> )}
        </div>
    }
    const handleUploadHouseImages = () => {        
        const formData = new FormData()
        houseImagesFormData.forEach(data=>{
            formData.append('houseImage',data);
        })
        dispatch(uploadHouseImages(formData,id))
    }
    return ( 
        <div style={{margin:"0 auto",width:"90%"}}>
            <h2 className="text-center" id='uploadHouseImageHeading'> Upload House Image </h2>
            <p className="text-center"> Upto 8 picture </p>

            <div className="row mt-5">
                <div className="col-md-6">
                    {addImageRender()}
                </div>
                {houseImagesLink.length===0?'': <div className="col-md-6">
                   <h5 className='text-center'> Here Total {houseImagesLink.length} Picture </h5>
                   <h5 className='text-center'> {8-houseImagesLink.length} More Picture can Upload </h5>
                   <h5 className='text-center text-danger'> Click Picture To Remove </h5>
                   {houseImagesLink.map(img=>{
                       return <a href='#uploadHouseImageHeading' key={img}><img src={img} onClick={()=>removeImage(img)} alt="House PhotosS" className='col-6 previewImage' /></a>
                   })}
                   <div className='text-center' id='addInQueue'><button className="btn btn-primary" onClick={handleUploadHouseImages}>Submit</button></div>
                </div>}
            </div>
        </div>
     );
}
 
export default UploadHouseImage;