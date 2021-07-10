import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import { uid } from "uid";
import {Button} from '@material-ui/core';
import axios from "axios";


function App() {
   const [contacts, setContacts] = useState([
  // {
  //    id:1,
  //    name: "Mira",
  //    telp: "01119702553",
  //  },
  //  {
  //   id:2,
  //   name: "Azuri",
  //   telp: "0192243430",
  //  },
  ]);

  const [isUpdate, setIsUpdate,] = useState({id:null, status: false});

  const[formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  useEffect (()=> {
    //fetch data from json
    axios.get("http://localhost:3000/contacts").then(res=> {
      console.log(res.data);
      //get data from json to setContacts 
      //question mark dengan array tu means kalau data kosong so dia return data kosong
      setContacts(res?.data ?? []);
    });
  },[]);

  function handleChange (e){
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("okay");
    let data = [...contacts];

    if(formData.name ===""){
      return false;
    }
    if(formData.telp ===""){
      return false;
    }

    if(isUpdate.status){
      data.forEach((contact) => {
        if(contact.id === isUpdate.id){
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });

    //isUpdate.id sebab akan baca id untuk update data
     axios.put(`http://localhost:3000/contacts/${isUpdate.id}`,{
       name: formData.name,
       telp: formData.telp,
     })
     .then(res => {
       alert("Data Updated");
     })

    }else{
      let newData = { id: uid(), name: formData.name, telp: formData.telp};
      data.push(newData);
      
      //save data to json (new data/new contact)
      //.then res tu untuk keluarkan message alert
      axios.post('http://localhost:3000/contacts', newData).then((res) => {
      alert("Data saved");
      });
    }

    //tambah contact
    setIsUpdate({ id: null, status: false});
    setContacts(data);
    setFormData({ name: "", telp: ""});
  }

  //function edit
  function handleEdit(id) {

    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData ({ name: foundData.name, telp: foundData.telp});
    setIsUpdate({id: id, status: true});
  }

  //function delete
  function handleDelete(id){
    let data = [...contacts];
    let filteredData = data.filter(contact => contact.id !== id);
    
    axios.delete(`http://localhost:3000/contacts/${id}`).then(res =>{
      alert("Data has been deleted");
    });
    
    setContacts(filteredData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label> <br></br>
          <input type="text" className="form-control" 
          onChange={handleChange} value={formData.name} name="name" />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="">Telephone No</label> <br></br>
          <input type="text" className="form-control" 
          onChange={handleChange} value={formData.telp} name="telp" />
        </div>
        <br></br>
        <div>
          <Button type="submit" className="btn btn-primary w-100 mt-3" variant = "outlined"> 
            Save
          </Button>
        </div>
      </form>

      <List 
       handleDelete = {handleDelete}
       handleEdit = {handleEdit} 
       data={contacts} />
    </div>
  );
}

export default App;