import React from "react";




import { Header} from './components'
import {Home, Cart} from "./pages";
import { Route, Routes } from "react-router-dom";


function App () {
  const [searchValue, setSearchValue] = React.useState('');
  


return (
  <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} exact />
            <Route path="/cart" element={<Cart />} exact />
          </Routes>
        </div>
      </div>
);

}

export default App;
 
