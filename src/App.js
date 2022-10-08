import {NavBar, NewCarsCollection, AddCar} from "./ui-components";
import { DataStore } from "aws-amplify";
import { withAuthenticator, Divider } from "@aws-amplify/ui-react";
import './App.css';
import { useState } from "react";
import { RentalCar } from "./models";

function App({user, signOut}) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const saveRentalCar = async () => {
    try {
      await DataStore.save(
        new RentalCar({
          name: name,
          price: parseFloat(price),
          description: description,
          imageUrl: imageUrl
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  const addCarOverrides = {
    "TextField29766922": {
      onChange: (event) => {
        setName(event.target.value);
      }
    },
    "TextField29766923": {
      onChange: (event) => {
        setPrice(event.target.value);
      }
    },
    "TextField29766924": {
      onChange: (event) => {
        setDescription(event.target.value);
      }
    },
    "TextField34472681": {
      onChange: (event) => {
        setImageUrl(event.target.value);
      }
    },
    "Button": {
      onClick: saveRentalCar
    }
  }

  const navbarOverrides = {
    "car--v1 1": {
      src: "https://img.icons8.com/color/50/000000/car--v1.png"
    },
    "image": {
      src: user?.attributes?.profile
    },
    "Button": {
      onClick: signOut
    }
  }
  
  return (
    <div className="App">
      <NavBar overrides={navbarOverrides} width="100%"/>
      <header className="App-header">
        <h1>Car Rental App</h1>
        <AddCar overrides={addCarOverrides} style={{textAlign: "left", margin: "1rem"}} />
        <Divider />
        <NewCarsCollection />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
