import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AddBrandForm = () => {
    //Biến nhận name từ form
    const [name, setName] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Kiểm tra đã nhập hay chưa
        if(name.trim() === ''){
            alert("Không được để trống");
            return;
        }

        //Tạo biến mới để lưu
        const newBrand = {Name: name};

        //Gọi API lưu
        fetch('http://localhost:8080/brands/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newBrand)
        })
            .then(respone => {
                if (respone.ok){
                    alert("Thêm thành công");
                    navigate('/');
                } else {
                    alert("Thêm thất bại");
                }
            })
            .catch(error => {
               console.error("Lỗi ", error);
               alert("Đã xãy ra lỗi");
            });
    }

    return <div>
        <form>
            Name: <input type="text" onChange={(e) => setName(e.target.value)}/>
            <button type="button" onClick={handleSubmit}>Add</button>
        </form>
    </div>
}

export default AddBrandForm;