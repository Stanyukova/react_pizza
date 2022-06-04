import React from 'react'
import {Categories, SortPopup, PizzaBlock, LoadingBlock} from '../components'
import { useSelector, useDispatch} from "react-redux";
import {setCategory, setSortBy} from '../redux/actions/filters'
import { fetchPizzas } from "../redux/actions/pizzas";
import axios from 'axios';



const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
  { name: "популярности", type: "popular", order: 'desc' },
  { name: "цене", type: "price", order: 'desc' },
  {name:"алфавиту", type: "name" , order: 'asc'},
];


function Home({searchValue}) {

  
 
  const dispatch =  useDispatch ();
const items = useSelector(({ pizzas}) =>pizzas.items);
const cartItems = useSelector(({ cart}) =>cart.items);
const isLoaded = useSelector(({ pizzas}) =>pizzas.isLoaded);
const {category, sortBy} = useSelector(({ filters}) =>filters);



React.useEffect(() =>{
  
  dispatch(fetchPizzas(sortBy, category));
 }, [category, sortBy]);

const onSelectCategory = React.useCallback ((index) => {
  dispatch(setCategory(index));
}, []);

const onSelectSortType = React.useCallback ((type) => {
  dispatch(setSortBy(type));
}, []);
const handleAddPizzaToCart =( obj) => {
dispatch({
  type: 'ADD_PIZZA_CART',
  payload: obj,
});
}

const getPizzas= () => {
  axios.get('https://629a3c306f8c03a978533aef.mockapi.io/items')
  .then((res) =>{
    setCategory(res.data)
  })
}
React.useEffect(()=>{
  getPizzas()
}, []);

const filteredPizzas= items.filter(obj=> {
  return obj.name.toLowerCase().includes(searchValue.toLowerCase())
  });





 

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
         activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded ? filteredPizzas.map((obj) => (
          <PizzaBlock onClickAddPizza={handleAddPizzaToCart} key={obj.id} 
          addedCount = {cartItems[obj.id] && cartItems[obj.id].items.length}
          {...obj} />
        )) : Array(10).fill(0)
        .map((_, index) => <LoadingBlock  key={index} />)}
        
      </div>
    </div>
  );
}


export default Home