import React,{useEffect} from 'react';
import './../node_modules/react-image-crop/dist/ReactCrop.css';
import './Sass/style.scss';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Signup from './component/Signup';
import Alert from './component/Alert';
import Login from './component/Login';
import FindHouse from './component/House/FindHouse';
import ShowHouse from './component/House/ShowHouse';
import CreateHouse from './component/House/CreateHouse';
import Profile from './component/User/Profile';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './actions';
import EditProfile from './component/User/EditProfile';
import Support from './component/Support';
import UploadImage from './component/User/UploadImage';
import UploadHouseImage from './component/House/UploadHouseImage';
import Footer from './component/Footer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.hrms) dispatch(getUserProfile())
    //statements suspected to throw exception.
    // eslint-disable-next-line
  }, []);
  return ( 
    <div>
        <Router 
        history={history}
        >
          <div>
            <Navbar />
            <div style={{marginTop:'6rem'}}>
            <Alert />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/user/:id" exact component={Profile} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/editprofile" exact component={EditProfile} />
              <Route path="/findhouse" exact component={FindHouse} />
              <Route path="/createhouse" exact component={CreateHouse} />
              <Route path="/edithouse/:id" exact component={CreateHouse} />
              <Route path="/house/:id" exact component={ShowHouse} />
              <Route path="/uploadhouseimage/:id" exact component={UploadHouseImage} />
              <Route path="/support" exact component={Support} />
              <Route path="/uploadprofileimage" exact component={UploadImage} />
              <Redirect to="/" />
            </Switch>
            <Footer />
            </div>
          </div>
        </Router>
        
        
      </div>
   );
}
 
export default App;