import React,{useState,useEffect} from 'react';
import Input from './../Input';
import { useDispatch, useSelector } from 'react-redux';
import { createHouseForm, editHouseForm, showHouse, emptyHouse} from '../../actions/findHouse';
import { useParams } from 'react-router';

const CreateHouse = () => {
    const dispatch = useDispatch();
    const [houseState, sethouseState] = useState({
        houseAddress:'',
        totalRoomNo:'',
        bedRoom:'',
        totalToilet:'',
        totalbalcony:'',
        size:'',
        rentFee:'',
        addittionalCharge:'',
        description:''
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
        else {
            dispatch(emptyHouse())
        }
        // eslint-disable-next-line
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        if(id) dispatch(editHouseForm(id,houseState))
        else dispatch(createHouseForm(houseState))
    }
    
    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'> House Information </h2>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="form-row">
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
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
}
 
export default CreateHouse;