import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddBrandForm = () => {
    //Biến nhận name từ form
    const [name, setName] = useState();
    const navigate = useNavigate('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Kiểm tra đã nhập hay chưa
        if(name.trim() === ''){
            alert("Không được để trống");
            return;
        }

        //Tạo biến mới để lưu
        const newBrand = {Name: name};

        const headers = {
            'Content-type': 'application/json',
        }

        //Lấy token (nếu có)
        const token = localStorage.getItem('token');

        if(token){
            headers['Authorization'] = `Bearer {token}`;
        }

        //Gọi API lưu
        fetch('http://localhost:8080/brands/create', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newBrand)
        })
            .then(response => {
                if (response.ok){
                    alert("Thêm thành công");
                    navigate('/');
                } else if (response.status === 401 || response.status === 403) {
                    alert("Bạn không có quyền thực hiện hoặc phiên đăng nhập đã hết hạn");
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