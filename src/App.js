import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
function App() {

  // const [userDetails, setUserDetails] = useState();

  // const user=async()=>{
  // try{
  //   const userDetail=await axios.get("https://randomuser.me/api/");
  //   setUserDetails(userDetail.data.results[0]) ;
  // }
  // catch(error){
  //   console.log(error);
  // }
  // };
  
  // console.log(userDetails);
  
  const[countries,setCountries]=useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState("");
  const [submit, setSubmit] = useState(false);

  const fetch=async()=>{
    try{
      const country=await axios.get(
        "https://countriesnow.space/api/v0.1/countries"

        );
        // console.log(country.data.data);
        setCountries(country.data.data);
    }
    catch(error)
    {
      console.log(error);
    }
  };

  const fetchCities=(country)=>{
    setSubmit(false);
    setSingleCity(null);
    setSingleCountry(country);
    const findCities=countries.find((c)=>c.country===country);
    console.log(findCities.cities);
    setCities(findCities.cities);
  };

  const submitHandler=()=>{
    if(singleCountry&&singleCity)
    {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetch();
    // user();
  }, [])
  return (<div className="App">
    <div className="App-header">
        <h1>Select your HomeTown</h1>
        <div>
          {
            countries && (
            <select
             onChange={(e)=>fetchCities(e.target.value)} 
            value={singleCountry}>
            <option disabled selected hidden>
              Select country
            </option>
            {
              countries.map((country)=>
              (
                <option key={`${country.country}`} value={country.country}>
                  {country.country}
                </option>
                
              ))
            }
          </select>)
          }
          
          {cities&&(
          <select onChange={(e)=>setSingleCity(e.target.value)}
          value={singleCity}>
            <option disabled selected hidden>
              Select city
            </option>
            {cities.map((city)=>(
              <option key={city}>{city}</option>

            ))}

          </select>
          )}
          <button onClick={submitHandler}>Go</button>
        </div>{
          submit&&
        (<h3>Your Country is {singleCountry} and your city is {singleCity}</h3>)}
    </div>
     {/* {userDetails && <img src={userDetails.picture.large} alt="no found" />} */}
    
  </div>
  );
};

export default App;
