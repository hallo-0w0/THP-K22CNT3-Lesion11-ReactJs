import React, { useEffect, useState } from 'react'
import axios from '../api/ThpApi';

export default function ThpCategoryForm(onCloseForm, onCategorySubmit, renderThpCategory) {
    // state
    const [thpId, setThpId] = useState("");
    const [thpCategoryName, setThpCategoryName] = useState("");
    const [thpCategoryStatus, setThpCategoryStatus] = useState(true);

    useEffect(() => {
        setThpId(renderThpCategory.thpId);
        setThpCategoryName(renderThpCategory.thpCategoryName);
        setThpCategoryStatus(renderThpCategory.thpCategoryStatus);

    })
    const thpHandleClose = () => {
        onCloseForm(false);
    }
    const thpHandleSubmit = async (event) => {
        event.preventDefault();
        if (thpId === 0) {//add
            let thpCategory = {
                thpId: 0,
                thpCategoryName: thpCategoryName,
                thpCategoryStatus: thpCategoryStatus
            }
            console.log("thpCategory", thpCategory);
            await axios.post("ThpCategory", thpCategory)
            onCategorySubmit(thpCategory);
        }
        else {//edit
            let thpCategory = {
                thpId: thpId,
                thpCategoryName: thpCategoryName,
                thpCategoryStatus: thpCategoryStatus
            }
            console.log("thpCategory", thpCategory);
            await axios.push("ThpCategory", thpCategory)
            onCategorySubmit(thpCategory);
        }
    }
    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" className="form-control"
                        name='thpCategoryName'
                        value={thpCategoryName}
                        onChange={(ev) => setThpCategoryName(ev.target.value)}
                        placeholder="Category Name" aria-label="Category Name"
                        aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='thpCategoryStatus'
                        value={thpCategoryStatus}
                        onChange={(ev) => setThpCategoryStatus(ev.target.value)}
                    >

                        <option value={true}>Hiển thị</option>
                        <option value={false}>Tạm khóa</option>

                    </select>
                </div>
                <button className='btn btn-success' onClick={thpHandleSubmit}>Ghi lại</button>
                <button className='btn btn-danger' onClick={thpHandleClose}>Close</button>

            </form>

        </div>
    )
}
