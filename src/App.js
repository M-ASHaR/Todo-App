
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";

//to get the data from Local Storage
const getLocalItems =()=>{
  let lists=localStorage.getItem('lists');
  console.log(lists)

  if(lists){
    return JSON.parse([localStorage.getItem('lists')]);
  } else{
    return [];
  }
}

const App = () =>{
  const [inputList,setInputList]=useState("");


  const[Items,setItems]= useState([getLocalItems()]);
 
  const itemEvent =(event) =>{
    setInputList(event.target.value);
  };

  const ListofItems =() =>{
  setItems((oldItems) =>{
    return[...oldItems,inputList];
  })
  setInputList("");
  };
  const deleteItems=(id) =>{
    console.log("deleted");

    setItems((oldItems)=>{
      return oldItems.filter((arrElement,index)=>{
        return index !==id;

      })
    })
};
  // add data to local storage 
  useEffect(() =>{
    localStorage.setItem('lists',JSON.stringify(Items))
  }, [Items]); 

    return <>
    <div className="main_div">
        <div className="center_div">
            <br />
            <h1>TODO List</h1>
            <br />
            <input type="text" placeholder="Add Items" value={inputList}
            onChange={itemEvent}/>
            <button onClick={ListofItems}> + </button> 

            <ol>
                {/* <li> {inputList}</li> */}

                {Items.map((itemval, index)=>{
                 return <TodoList 
                 key={index} 
                 id={index}
                 text={itemval} 
                onSelect={deleteItems}/>;
                })}
            </ol>
            </div>        
 

    </div>
    
    </>

}
 export default App;