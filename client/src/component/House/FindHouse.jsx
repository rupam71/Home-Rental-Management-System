import React,{useState,useEffect} from 'react';
import Input from '../Input';
import HouseList from './HouseList';
import { useSelector, useDispatch } from 'react-redux';
import { availableHouse, houseList } from './../../actions/findHouse';

const FindHouse = () => {
    const dispatch = useDispatch();
    const house = useSelector(state=>state.house)
    console.log('HOUSELIST::: ',house)

    const [houses, sethouses] = useState({
        houseAddress:'',
        totalRoomNo:'',
        size:'',
        rentFee:''
    });

    useEffect(() => {
        async function fetchMyAPI() {
            await dispatch(houseList('/available'))
          //  dispatch(availableHouse())
          }
      
          fetchMyAPI()
        // eslint-disable-next-line
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <div>
            <div className="">
                <div className="searchHouseContainer container">
                    <h1>Find Your House</h1>
                    <form onSubmit={handleSubmit} className='mb-5'>
                        <div className="form-row">
                            <Input
                                change={e => sethouses({ ...houses, houseAddress: e })}
                                type="text" label='Address' value={houses.houseAddress} />
                            <Input
                                change={e => sethouses({ ...houses, totalRoomNo: e })}
                                type="text" label='Total Room No' value={houses.totalRoomNo} />
                            <Input
                                change={e => sethouses({ ...houses, size: e })}
                                type="text" label='Maximum House Size' value={houses.size} />
                            <Input
                                change={e => sethouses({ ...houses, rentFee: e })}
                                type="text" label='Maximum Rent Fee' value={houses.rentFee} />
                            <button className="findbutton">Search House</button>
                        </div>  
                    </form>
                </div>

                <HouseList 
                headline='All Available House' />   
            </div>
        </div>
    );
}

export default FindHouse;