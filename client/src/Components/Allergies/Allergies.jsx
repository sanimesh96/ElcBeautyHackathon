import React, {useState, useEffect} from "react";
import Navbar from "../LandingPage/TopSection/Navbar/Navbar";
import { Footer } from "../Footer/footer";
import Select from 'react-select';

let allergiesOptions = [
  { value: 'unscented or fragrance-free', label: 'unscented or fragrance-free' },
  { value: 'Mineral oil/waxes', label: 'Mineral oil/waxes' },
  { value: 'Lanolin', label: 'Lanolin' },
  { value: 'ALS-Ammonium lauryl sulphate', label: 'ALS-Ammonium lauryl sulphate' },
  { value: 'Formaldehyde', label: 'Formaldehyde' },
  { value: 'Phthalates', label: 'Phthalates' },
  { value: 'Parabens', label: 'Parabens' },
  { value: 'Formaldehyde and formaldehyde donors', label: 'Formaldehyde and formaldehyde donors' },
  { value: 'Lead acetate', label: 'Lead acetate' },
  { value: 'Resorcinol', label: 'Resorcinol' },
  { value: 'Toluene', label: 'Toluene' }
];

function Allergies() {


    useEffect(() => {
      fetchAllergies()
    }, [])
    
    const [allergies, setAllergies] = useState([])
    const [oldAllergies, setOldAllergies] = useState([])
    const fetchAllergies = async () => {
        const response = await fetch("http://localhost:5001/api/auth/getAllAllergies", {
          method: "GET",
          headers: {
            "auth-Token" : localStorage.getItem("token")
          },
        });
        const json = await response.json();
        console.log(json.user.allergies)
        setOldAllergies(json.user.allergies)
      };

      const updateAllergies = async(e) =>{
        e.preventDefault();
        console.log(allergies)
        const response = await fetch("http://localhost:5001/api/auth/updateAllergies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-Token" : localStorage.getItem("token")
          },
          body: JSON.stringify({
            allergies : allergies
          }),
        });
        const json = await response.json();
        console.log(json)
      }

      async function handleChange(e){
        console.log(e)
        let al = await e.map((el)=> el.value)
        setAllergies(al)
      }

  return (
    <>
      <Navbar />
        <div className="container" style={{"height" : "500px"}}>
            <h1> Enter Your Allergies</h1>
            <form>
            <Select 
              isMulti
              name="allergies"
              options={allergiesOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
            />
                <br/>
                <button className="btn btn-primary" onClick={updateAllergies}>Submit</button>
            </form>
          <br/>

          <h2> Old Allergies : </h2>
          <ul>
          {oldAllergies.map((x,i) => {
            return (<li key = {i}>
              {x}
            </li>)
          })}
          </ul>
          
        </div>
      <Footer />

    </>

  );
}

export default Allergies;
