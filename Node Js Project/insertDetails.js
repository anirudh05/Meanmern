var http= require('http');
var fs= require('fs');
var qs= require('querystring');
var npay = require("./EmployeeBL");
var MongoClient= require("mongodb").MongoClient;

var eid;
var name;
var p;

http.createServer(function(req, res){
    if(req.method== "GET"){
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream("./insert.html","UTF-8").pipe(res)
    }else if(req.method=="POST"){
        var body="";
        req.on("data", function(chunk){
            body+=chunk;
            console.log("data");
        });

        req.on("end", function(){
            var obj= qs.parse(body);
            console.log(obj);
            eid= obj.empID;
            name= obj.name;
            p = parseFloat(obj.basicpay);
            var t = new npay.Employee(p);
            var netpay= t.calculateNetPay();
    
            res.writeHead(200, {"Content-Type": "Text/html"});
            res.end(`
                <!DocTYPE html>
                <html>
                <head>
                <title>Get converted value</title>
                </head>
                <body> 
                <form action="/" method="POST">
                <label>EMP ID </label>
                <input type="text" id="empID" value = ${eid} name="empID" readonly/>
         
                <label>Name</label>
                <input type="text" id="name" value = ${name} name="name" readonly/>
         
                <label>Basic Pay</label>
                <input type="text" id="basicpay" value = ${p} name="basicpay" readonly/>
             
                <label> Net Pay</label>
                <input type="text" id="netpay" name= "netpay" value= ${netpay} readonly />

                </form>
                </body> 
                </html>
            `);
        MongoClient.connect('mongodb://127.0.0.1:27017/sample', function(err, db){
            if(err){
            console.log(err);
             }
                
   
                db.collection('Employee').insert({"EmpID": eid, "Name": name, "BasicPay" : p, "NetPay" : netpay});

                db.close();
});
        });
        }
        }).listen(3000);
    console.log("form server starting on port 3000");



