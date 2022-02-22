import { PRODUCT_LIST } from "./../setting/setting.js";
import { Product } from "./sanPham.js";

export class Menu {
    productList = []
    constructor() { }
    addProduct = function (product) {
        this.productList.push(product);
    }
    saveProductList = function () {
        let storageProductList = JSON.stringify(this.productList);
        localStorage.setItem(PRODUCT_LIST, storageProductList);
    }
    getProductList = function () {
        if (localStorage.getItem(PRODUCT_LIST)) {
            let storageProductList = localStorage.getItem(PRODUCT_LIST);
            this.productList = JSON.parse(storageProductList);
        }
    }
    // deleteProduct = function (name) {
    //     let index = this.productList.findIndex(product => product.tenSP === name);
    //     if (index !== -1) {
    //         this.productList.splice(index, 1);
    //     }
    // }
    deleteProduct = function (index) {
        if (index !== -1) {
            this.productList.splice(index, 1);
        }
    }
    findProduct = function (product) {
        return this.productList.findIndex(x => x.tenSP === product);
        //hàm find trả về phần tử đúng với điều kiện trong dấu ()
        //trường hợp này hàm TRẢ VỀ 1 object trong mảng productList thỏa điều kiện có thuộc tính tenSP trùng với tham số product truyền vào
    }
    editProduct = function (index, updateArray) {
        console.log("index=> ", index);

        let objNeedUpdate = this.productList[index];//từ vị trí (index) đã chọn, gán vào obj update
        console.log("objNeedUpdate=> ", objNeedUpdate);
        for (let key in objNeedUpdate) {//lấy từng thuộc tính trong obj update
            objNeedUpdate[key] = updateArray[key];//gán từng thuộc tính

        }

        console.log("updateArray=> ", updateArray);
        console.log("productList => ", this.productList);
    }
    search = function (tenSP) {
        let result = this.productList;
        if (tenSP !== 'all' && tenSP) {
            result = this.productList.filter(word => word.tenSP === tenSP);
        }
        return result;
    }

    renderTableProduct = function (selector) {
        let renderTR = '';
        for (let i = 0; i < this.productList.length; i++) {
            let productPrototype = new Product();
            let product = this.productList[i];

            product = { ...productPrototype, ...product };
            // console.log("product=> ", product);
            // console.log("prototype=> ", productPrototype);
            renderTR += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${product.tenSP}</td>
                    <td>${product.giaNhapSP}</td>
                    <td>${product.soLuongSP}</td>
                    <td>${product.tinhLoiNhuan()}</td>
                    <td>${product.anhSP}</td>
                    <td>${product.moTaSP}</td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.tenSP}')">Xóa</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#popupModal" onclick="editProduct('${product.tenSP}')">Chỉnh sửa</button>
                    </td>
                </tr>
            `
        }
        document.querySelector(selector).innerHTML = renderTR;
    }
}