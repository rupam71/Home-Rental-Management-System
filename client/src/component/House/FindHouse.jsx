import React,{useState,useEffect} from 'react';
import HouseList from './HouseList';
import { useSelector, useDispatch } from 'react-redux';
import { availableHouse, houseList, serchHouse } from './../../actions/findHouse';

const Input = (props) => {
    let inputWidth= 'col-md-6';
    if(props.width) inputWidth='col-md-12';
    return (
        <div className={`form-group ${inputWidth}`}>
            <label>{props.label}</label>
            <input
                type={props.type}
                className="form-control"
                placeholder={`Enter Your ${props.label}`}
                onChange={ e => props.change(e.target.value)}
                value={props.value}
            />
        </div>

    );
}

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
        dispatch(houseList('/available'))
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async e => {
        e.preventDefault()
        // if(!houses.totalRoomNo) await sethouses({ ...houses, totalRoomNo: Infinity })
        // if(!houses.size) await sethouses({ ...houses, size: Infinity })
        // if(!houses.rentFee) await sethouses({ ...houses, rentFee: Infinity })
        console.log(houses)
        if(houses.houseAddress || houses.totalRoomNo || houses.size || houses.rentFee) {
            dispatch(serchHouse(houses)) 
            sethouses({
                houseAddress:'',
                totalRoomNo:'',
                size:'',
                rentFee:''
            })
        }
        else dispatch(houseList('/available'))
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
                                change={e => sethouses({ ...houses, totalRoomNo: parseInt(e) })}
                                type="text" label='Total Room No' value={houses.totalRoomNo} />
                            <Input
                                change={e => sethouses({ ...houses, size: parseInt(e) })}
                                type="text" label='Maximum House Size' value={houses.size} />
                            <Input
                                change={e => sethouses({ ...houses, rentFee: parseInt(e) })}
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