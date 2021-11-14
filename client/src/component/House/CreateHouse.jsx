import React,{useState,useEffect} from 'react';
import Input from './../Input';
import { useDispatch, useSelector } from 'react-redux';
import { createHouseForm, editHouseForm, showHouse } from '../../actions/findHouse';
import { useParams } from 'react-router';
import Resizer from 'react-image-file-resizer';

const CreateHouse = () => {
    const dispatch = useDispatch();
  //  const user = useSelector(state => state.auth.user)
    const [houseState, sethouseState] = useState({
        houseAddress:'',
        totalRoomNo:'',
        bedRoom:'',
        totalToilet:'',
        totalbalcony:'',
        size:'',
        rentFee:'',
        addittionalCharge:'',
        description:'',
        houseImages:[]
    });

    const house = useSelector(state => state.house[0])
    const id = useParams().id
    useEffect(() => {
        if(id) {
            dispatch(showHouse(id))
            sethouseState({
                houseAddress: house.houseAddress ,
                totalRoomNo: house.totalRoomNo ,
                bedRoom: house.bedRoom ,
                totalToilet: house.totalToilet ,
                totalbalcony: house.totalbalcony ,
                size: house.size ,
                rentFee: house.rentFee ,
                addittionalCharge: house.addittionalCharge ,
                description: house.description 
            })
        }
        // eslint-disable-next-line
    }, [id]);
    
    console.log("houseState :: ",houseState)

    const handleSubmit = e => {
        e.preventDefault();
        if(id) dispatch(editHouseForm(id,houseState))
        else dispatch(createHouseForm(houseState))
        console.log('SUBMIT HOUSE ::: ',houseState)
    }
    const arr = []
    const handleHouseImage = async (e) => {
        const files = e.target.files
        await Array.from(files).forEach(file=>{
             Resizer.imageFileResizer(
                file,
                300,
                300,
                "png",
                100,
                0,
                 async (uri) => {
                     arr.push(uri)
                     sethouseState({...houseState,houseImages:arr})
                     
                     const localImageUrl = await window.URL.createObjectURL(uri)
                     console.log("Local Image Url ::: ",localImageUrl)
                //    dispatch(profileImageUrl(localImageUrl))
    
                    const formData = new FormData();
                    formData.append('profilePicture',uri);
                //    dispatch(uploadProfileImage(formData))
                },
                "file",
                300,
                300
              );
        })
    }
    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-5'> House Information </h1>
            <form onSubmit={handleSubmit} className='mb-5' enctype="multipart/form-data">
                <div class="form-row">
                    <Input
                    change={e=>sethouseState({...houseState, houseAddress:e})}
                    type="text" label='House Address' value={houseState.houseAddress}/>
                    <Input
                    change={e=>sethouseState({...houseState, totalRoomNo:e})}
                    type="text" label='Total Room No' value={houseState.totalRoomNo}/>
                    <Input
                    change={e=>sethouseState({...houseState, bedRoom:e})}
                    type="text" label='Total Bed Room' value={houseState.bedRoom}/>
                    <Input
                    change={e=>sethouseState({...houseState, totalToilet:e})}
                    type="text" label='Total Toilet' value={houseState.totalToilet}/>
                    <Input
                    change={e=>sethouseState({...houseState, totalbalcony:e})}
                    type="text" label='Total Balcony' value={houseState.totalbalcony}/>
                    <Input
                    change={e=>sethouseState({...houseState, size:e})}
                    type="text" label='House Size' value={houseState.size}/>
                    <Input
                    change={e=>sethouseState({...houseState, rentFee:e})}
                    type="text" label='House Rent Fee /Month' value={houseState.rentFee}/>
                    <Input
                    change={e=>sethouseState({...houseState, addittionalCharge:e})}
                    type="text" label='Addittional Charge' value={houseState.addittionalCharge}/>
                    <Input width="full"
                    change={e=>sethouseState({...houseState, description:e})}
                    type="text" label='House Description' value={houseState.description}/>
                    <div class="form-group">
                        <input type="file" multiple="multiple"
                        onChange={handleHouseImage}
                        // onChange={(e)=>setuploadImage({buffer:e.target.files[0]})}
                        className="form-control-file" name='profilePicture'/>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg my-3">Submit</button>
            </form>
        </div>
    );
}
 
export default CreateHouse;