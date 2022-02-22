//Trong model không được sử dụng các thao tác dom từ giao diện.

// import { DANH_SACH_MON_AN } from "../util/settings.js";
// import { MonAn } from "./MonAn.js";

export class Menu {
    danhSachMonAn = []
    constructor() {

    }
    themMonAn = function (monAn) { // {maMon:'',tenMon:''}
        this.danhSachMonAn.push(monAn);
    }
    luuDanhSachMonAn = function () {
        let sDanhSachMonAn = JSON.stringify(this.danhSachMonAn);//chuyen sang string de co the xem duoc
        localStorage.setItem(DANH_SACH_MON_AN, sDanhSachMonAn);
    }
    layDanhSachMonAn = function () {
        if (localStorage.getItem(DANH_SACH_MON_AN)) {
            let sDanhSachMonAn = localStorage.getItem(DANH_SACH_MON_AN);
            this.danhSachMonAn = JSON.parse(sDanhSachMonAn);
        }
    }
    renderTableMonAn = function (selector) {
        let html = '';
        for (let i = 0; i < this.danhSachMonAn.length; i++) {
            //Mỗi lần duyệt lấy ra 1 object món ăn
            let monAnPrototype = new MonAn();
            let monAn = this.danhSachMonAn[i];
            monAn = { ...monAnPrototype, ...monAn };
            html += `
                <tr>
                    <td>${monAn.maMon}</td>
                    <td>${monAn.tenMon}</td>
                    <td>${monAn.loaiMon}</td>
                    <td>${monAn.giaMon}</td>
                    <td>${monAn.khuyenMai} %</td>
                    <td>${monAn.tinhGiaKhuyenMai()}</td>
                    <td>${monAn.maTinhTrang}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaMonAn('${monAn.maMon}')">Xoá</button>

                        <button  data-toggle="modal" data-target="#exampleModal" class="btn btn-primary" onclick="chinhSuaMon('${monAn.maMon}')">Chỉnh sửa</button>
                    </td>
                </tr>
            `
        }
        document.querySelector(selector).innerHTML = html;
    }
    xoaMonAn = function (maMon) {
        //Cách 1: Tìm index món ăn trong danhSachMonAn và xử lý xoá 
        // let index = this.danhSachMonAn.findIndex(mon => mon.maMon === maMon);
        // if(index !== -1) {
        //     this.danhSachMonAn.splice(index,1);
        // }
        //cách này xóa trực tiếp phần tử cần xóa
        //Cách 2: 
        this.danhSachMonAn = this.danhSachMonAn.filter(mon => mon.maMon !== maMon);
        //cách này tạo ra 1 mảng mới mà không có obj cần xóa
    }
    layThongTinMonAn = function (maMon) {
        return this.danhSachMonAn.find(monAn => monAn.maMon === maMon);
    }


    capNhatMonAn = function (maMon, monAnCapNhat) {
        //monAnUpdate là thằng trong this.danhSachMonAn
        let monAnUpdate = this.layThongTinMonAn(maMon);
        if (monAnUpdate) {
            for (let key in monAnUpdate) {
                monAnUpdate[key] = monAnCapNhat[key];
                //Đưa thông tin người dùng thay đổi gán vào object trong mảng
                // monAnUpdate.tenMon = monAnCapNhat.tenMon;
            }
        }
    }

    filterMonAn = function (loaiMon) {
        let result = this.danhSachMonAn;
        if (loaiMon !== 'all' && loaiMon) {
          result = this.danhSachMonAn.filter(mon => mon.loaiMon === loaiMon);
            
        }

        // this.danhSachMonAn = result;
        return result;
    }

}