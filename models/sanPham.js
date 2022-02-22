
export class Product {
    tenSP = '';
    giaNhapSP = '';
    giaBanSP = '';
    soLuongSP = '';
    anhSP = '';
    moTaSP = '';
    constructor() { }
    tinhLoiNhuan = function () { //lợi nhuận trừ 20% kho bãi 
        let loiNhuan = (Number(this.giaBanSP)-Number(this.giaNhapSP))*this.soLuongSP*0.8;
        return loiNhuan;
    }
};