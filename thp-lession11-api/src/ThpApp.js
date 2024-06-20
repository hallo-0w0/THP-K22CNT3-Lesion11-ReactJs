import React, { useEffect, useState } from 'react';
import './App.css';
import ThpCategoryList from './components/ThpCategoryList';
import axios from './api/ThpApi';
import ThpCategoryForm from './components/ThpCategoryForm';

function ThpApp() {
  const [thpCategories, setThpCategories] = useState([]);

  const getCategories = async () => {
    try {
      const thpCateResponse = await axios.get("ThpCategory");
      setThpCategories(thpCateResponse.data);
    } catch (error) {
      console.log("lỗi: ", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("thpCategories: ", thpCategories);
  }, [thpCategories]); 

  // Trạng thái form
  const [thpCategoryIsForm, setThpCategoryIsForm] = useState(false);
  //Duữ liệu form: add/edit
  let thpCategoryInit = {
    thpId: 0,
    thpCategoryName: "",
    thpCategoryStatus: true
}
  const [thpCategoryEdit, setThpCategoryEdit] = useState("thpCategoryInit");


  const thpHandleAddNew = (param)=>{
    setThpCategoryIsForm(param);
  }

  const thpHandleCategoryCloseForm=(param)=>{
    setThpCategoryIsForm(param);
  }

  const thpHandleCategorySubmit=(param)=>{
    let id= thpCategories[thpCategories.length-1].thpId;
    console.log("Mã",id);
    param.thpId= id+1;
    thpCategories.push(param)
    setThpCategories((prev)=>{
      return[...prev];
    })
    setThpCategoryIsForm(false);

  }

  //ham xoa 1 doi tuong
  const thpHandleDelete = (thpId)=>{
    console.log("App-Delete-thpId:",thpId);
    // xoa tren Api
    // const thpResponse =  axios.delete(`https://6670f04e0900b5f8724bfd04.mockapi.io/thpApi/thpv1/ThpCategory/${thpId}`);
    const thpResponse =  axios.delete(`ThpCategory/${thpId}`);

    console.log("thpResponse-Delete",thpResponse);

    let thpDelete = thpCategories.filter(x=>x.thpId !== thpId)
    setThpCategories(thpDelete);
    console.log("Delete:",thpDelete);
  }

  //edit catagory
  const thpHandleEdit = (thpCategory)=>{


    setThpCategoryEdit(thpCategory);
    setThpCategoryIsForm(true);

  }


  return (
    <div className="container border my-3">
      <h1>Trinh Huu Phuc - Call Api</h1>
      <ThpCategoryList renderThpCategories={thpCategories} 
                        onAddNew={thpHandleAddNew}
                        onThpDelete={thpHandleDelete}
                        onThpEdit={thpHandleEdit}/>
      <hr/>
      {
        thpCategoryIsForm===true?<ThpCategoryForm 
                                  renderThpCategory = {thpCategoryEdit}
                                  onCloseForm={thpHandleCategoryCloseForm}
                                  onCategorySubmit={thpHandleCategorySubmit}

                                  />:""
      }
      
    </div>
  );
}

export default ThpApp;
