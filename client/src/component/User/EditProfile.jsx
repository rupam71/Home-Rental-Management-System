import React,{useState,useEffect} from 'react';
import Input from './../Input';
import Dropdown from './../Dropdown';
import { useDispatch,useSelector } from 'react-redux';
import { newError } from './../../actions/error';
import { EditProfileForm } from './../../actions/index';

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [editProfile, seteditProfile] = useState({
        name:'',
        phoneNumber:'',
        address:'',
        gender:'',
        dateOfBirth:''
    });
    useEffect(() => {
        if(user) seteditProfile({
            name:user.name,
            phoneNumber:user.phoneNumber,
            address:user.address,
            gender:user.gender,
            dateOfBirth:user.dateOfBirth,
        })
        // eslint-disable-next-line
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if(!editProfile.name) dispatch(newError("Name is required", "danger"))
        else dispatch(EditProfileForm(editProfile))
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'> Edit Profile </h2>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="form-row">
                    <Input
                    change={e=>seteditProfile({...editProfile, name:e})}
                    type="name" label='Name' value={editProfile.name}/>
                    <Dropdown 
                    change={e=>seteditProfile({...editProfile, gender:e})}
                    name={"Gender"} option={['male','female']} />
                    <Input
                    change={e=>seteditProfile({...editProfile, dateOfBirth:e})}
                    type="date" label='Date Of Birth' value={editProfile.dateOfBirth}/>
                    <Input width="full"
                    change={e=>seteditProfile({...editProfile, phoneNumber:e})}
                    type="text" label='Phone Number' value={editProfile.phoneNumber}/>
                    <Input width="full"
                    change={e=>seteditProfile({...editProfile, address:e})}
                    type="text" label='Address' value={editProfile.address}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Edit Profile</button>
            </form>
        </div>
    );
}
 
export default EditProfile;