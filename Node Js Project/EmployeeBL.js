class Employee{

    constructor(basicPay){
        this.basicPay = basicPay;
    }

    calculateNetPay(){
        var grossPay = 0;
        
        if(this.basicPay>50000){
        var hra = (this.basicPay*.4);
        }
        
        else{
        var hra = (this.basicPay*.3);
        }
        grossPay = this.basicPay + hra;
        var netPay = grossPay - 1000;
        return netPay;
        }
}
module.exports.Employee=Employee;
