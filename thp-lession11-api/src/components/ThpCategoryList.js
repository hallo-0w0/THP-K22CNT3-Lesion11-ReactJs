import React from 'react'

export default function ThpCategoryList({ renderThpCategories, onAddNew, onThpDelete, onThpEdit }) {
  console.log("renderThpCategories: ", renderThpCategories);
  let thpCategoryElement = renderThpCategories.map((thpCategory, index) => {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{thpCategory.thpId}</td>
        <td>{thpCategory.thpCategoryName}</td>
        <td>{thpCategory.thpCategoryStatus === true ? "Hiển thị: " : "tạm khóa"}</td>
        <td>
          <button className='btn btn-danger'
            onClick={() => thpHandleDelete(thpCategory.thpId)}>
            Delete
          </button>
          <button className='btn btn-success'
            onClick={() => thpHandleEdit(thpCategory)}>
            Edit
          </button>
        </td>

      </tr>
    )
  })

  const thpHandleAdd = () => {
    onAddNew(true);
  }

  //hàm x.lý sự kiện xóa
  const thpHandleDelete = (thpId) => {
    if (window.confirm('bạn có thật sự muốn xóa Catagory có mã[' + thpId + '] không')) {
      console.log("Delete:", thpId);
      onThpDelete(thpId)
    }
    else {

    }
  }

  //ham edit
  const thpHandleEdit=(thpCategory)=>{
    onThpEdit(thpCategory);
  }


  return (
    <div className='container m-2'>
      <h2> Danh sach san pham</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {thpCategoryElement}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={thpHandleAdd}>Add new</button>
    </div>
  )
}
