import { useEffect, useState } from "react";
import Collection from "./Collection";

function App() {
  const [isLoading, setIsLoadind] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('');
  const [dataCollection, setDataCollection] = useState([]);

  const cats =[
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Гори" },
    { "name": "Архітектура" },
    { "name": "Міста" }
  ];


  useEffect(() => {
    setIsLoadind(true)
    const categoryValue = categoryId ? `category=${categoryId}`: ``;

    const pageParam = ``;
    fetch(`https://63f773d6e8a73b486af865aa.mockapi.io/photo_collections?page=${page}&limit=3&${categoryValue}`)
    .then(result => result.json())
    .then(data => setDataCollection(data))
    .catch(err => {
      console.warn(err);
      alert('Виникла помилка при запросі на сервер')
    })
    .finally(() => setIsLoadind(false))
  }, [categoryId, page])

  function onChangeSearchValue(event){
    setSearchValue(event.target.value)
  }


  return (
  <div className="App">
    <h1>Колекція фотографій</h1>
    <div className="top">
      <ul className="tags">
        {cats.map((obj, index) => {
          return <li onClick={() => setCategoryId(index)} key ={obj.name} className ={categoryId === index ? 'active' : ''}>{obj.name}</li>
        })}
      </ul>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      <input className="search-input" value={searchValue} onChange={onChangeSearchValue} placeholder="Пошук по назві"/>
      </div>
    </div>
    <div className="content">
      {isLoading ? <h2>Триває загрузка... </h2>: dataCollection.filter(obj => {
          const fullName = (obj.name).toLowerCase();
          return fullName.includes(searchValue.toLowerCase())
        }
      ).map((colection, index) =>{
        return <Collection 
        key ={index}
        name= {colection.name}
        images = {colection.photos}/>
      })}
    </div>
    <ul className="pagination">
      {[...Array(5)].map((obj, index) => {
        return <li key = {index} onClick={() => setPage(index +1)} className= {page === (index +1) ? 'active' : ''}>{index + 1}</li>
      })}
    </ul>
  </div>
  );
}

export default App;
