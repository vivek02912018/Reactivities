import React from 'react';
import logo from './logo.svg';
import './App.css';
import {cars}   from './demo';
//import {posts} from './demo';
import CarItem from './CarItem';

 

function App(props: { cars: any[]; }) {
return (
  <div className="App">
    <ul>
      {                   
        props.cars.map((car)=>(
          <CarItem car ={car}/>))
      }
    </ul>
  </div>
);
}
  

export default App;
