/*
chức năng
    1 show danh sách lên màn hình
    2 tạo sản phẩm mới
    3 xóa sản phẩm
    4 chỉnh sửa và cập nhật sản phẩm
    5 sử dụng localstorage để lưu data
*/
import { Menu } from "../models/menu.js"
import { Product } from "../models/sanPham.js"

let menu = new Menu();
menu.getProductList();//lấy danh sách từ localstorage xuống (nếu có)
menu.renderTableProduct('tbody');
console.log(menu);
let pickIndex = 0;



document.querySelector('button#btnAddProduct').onclick = function () {
    let productMain = new Product(); //tạo ra object productMain
    let arrayInput = document.querySelectorAll('.inputInfo input, .inputInfo textarea')
    for (let key of arrayInput) { // chạy vòng lặp
        let { id, value } = key;
        console.log("ket qua=> ", id, "=", value);
        productMain[id] = value; //gán giá trị vào productMain
    }
    menu.addProduct(productMain);//đẩy productMain này vào mảng productList
    menu.saveProductList();// lưu productList vào localStorage
    // console.log("productMain=> ", productMain);
    menu.renderTableProduct('tbody');

    /*-------------Clear input------------------------ */
    for (let key of arrayInput) {// gọi ra từng input
        console.log("key=> ", key);
        key.value = '';//đặt giá trị cho input đó là rỗng => xóa trắng input
    }
    /*-------------End clear input-------------------- */
}


document.querySelector('button#btnAdd').onclick = function () {//hàm này để thay đổi popup
    document.querySelector('button#updateProduct').style.display = "none";//ẩn nút chỉnh sửa
    document.querySelector('button#btnAddProduct').style.display = "block";//hiện nút thêm
    document.querySelector('#exampleModalLabel').innerHTML = "Thêm sản phẩm"//đổi tiêu đề

    /*-------------Clear input------------------------ */
    let arrayInput = document.querySelectorAll('.inputInfo input, .inputInfo textarea');//tạo mảng input
    for (let key of arrayInput) {// gọi ra từng input
        console.log("key=> ", key);
        key.value = '';//đặt giá trị cho input đó là rỗng => xóa trắng input
    }
    /*-------------End clear input-------------------- */
}

window.deleteProduct = function (x) {
    let findProductIndex = menu.findProduct(x);//tìm sản phẩm
    menu.deleteProduct(findProductIndex);//xóa sản phẩm
    menu.saveProductList();//lưu lại mảng mới trên localstorage
    menu.renderTableProduct('tbody');//render lại ra màn hình
}


window.editProduct = function (x) {
    let findProductIndex = menu.findProduct(x); //hàm findProduct sẽ trả về index (vị trí) của obj cần tìm
    let arrayEditProduct = menu.productList[findProductIndex]; //từ vị trí đó lấy ra obj cần tìm, gán vào arrayEditProduct
    console.log("findProductIndex=> ", findProductIndex);
    // console.log("arrayEditProduct=> ", arrayEditProduct);
    pickIndex = findProductIndex;

    let inputArray = document.querySelectorAll('.inputInfo input, .inputInfo textarea');//lấy các input trong popup ra
    for (let key of inputArray) {//lấy từng cái input
        let { id } = key;
        key.value = arrayEditProduct[id];//gán giá trị của arrayEditProduct vào cái input để hiển thị cho người dùng thấy

        // console.log("key=> ", key);
        // console.log("id=> ", id);
        // console.log("arrayEditProduct[id]=> ", arrayEditProduct[id])
        // console.log("arrayEditProduct=> ", arrayEditProduct)
    }
    /*-----------------thay đổi giao diện--------------- */
    document.querySelector('button#updateProduct').style.display = "block";//ẩn nút chỉnh sửa
    document.querySelector('button#btnAddProduct').style.display = "none";//hiện nút thêm
    document.querySelector('#exampleModalLabel').innerHTML = "Chỉnh sửa sản phẩm"//đổi tiêu đề    
}



document.querySelector('button#updateProduct').onclick = function () {
    let productUpdate = new Product(); //tạo 1 mảng rỗng
    let arrayEditInput = document.querySelectorAll('.inputInfo input, .inputInfo textarea');//lấy các input trong popup ra
    for (let key of arrayEditInput) {//chọn từng thuộc tính ra
        let { id, value } = key;
        productUpdate[id] = key.value;//đẩy giá trị vào thuộc tính đã chọn
    }
    // console.log("productUpdate=> ", productUpdate);
    menu.editProduct(pickIndex, productUpdate);
    menu.renderTableProduct('tbody');
    menu.saveProductList();
}


document.querySelector('input#inputSearch').onchange = function () {
    let searchInput = document.querySelector('input#inputSearch').value;
    let temp = [...menu.productList];
    menu.productList = menu.search(searchInput);
    menu.renderTableProduct('tbody');
    menu.productList = temp;
}