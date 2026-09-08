import React, {useState, useEffect} from 'react';

const BrandList = () => {
    //State lưu brands được gửi về
    const [brands, setBrands] = useState([]);
    //State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    //Gọi API ngay khi component đuợc chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/brands')
            .then(respone => respone.json())
            .then(data => {
                setBrands(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Hiển thị chữ loading
    if(loading){
        return <p>Đang load data...</p>;
    }

    return (
        <div>
            <h3>Brand list</h3>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                </tr>
                {brands.map(brand => (
                    <tr key={brand.Id}>
                        <td>{brand.Id}</td>
                        <td>{brand.Name}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default BrandList;