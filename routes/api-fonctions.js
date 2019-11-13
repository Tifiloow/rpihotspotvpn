const hostapdfile = "/etc/hostapd/hostapd.conf" //hostapd conf file
const exec = require('child_process').exec
const fs = require('fs');

function rebootrpi() { //fonction to reboot the pi
    testscript = exec('sudo reboot');
}


function rebootsoft(callaback) { //reboot the software : dnsmasq + hostapd
  try{
    dnsmasqreboot = exec('sudo systemctl restart dnsmasq');
    hostapdreboot = exec('sudo systemctl restart hostapd');
    callback(null);
  } catch (error){
    callback(error.toString());
  }
}



function ethernetstatus(callback){ //get ethernetstatus.txt file data, tells if ethernet started or not
const fileName = './ethernetstatus.txt';
fs.readFile(fileName, 'utf8', (err,data) => {
   if (err) {throw callback(null, err)}
   callback(data, null)
});
}

function ethernetwritestatus(status){ //change ethernetstatus.txt value, : on or off
fs.writeFile('./ethernetstatus.txt', status, (err) => {
});
}



function startethernet(res) { //start ethernet & write it in ethernetstatus.txt
    req = exec('sudo ifconfig eth0 up') //enable ethernet on the rpi
    ethernetwritestatus('on')
     res.json({message: 'up now', success: true})
}


function stopethernet(res) { //stop ethernet & write it in ethernetstatus.txt
    req = exec('sudo ifconfig eth0 down')
    ethernetwritestatus('off')
    res.json({message: 'down now', success : true})
}

function changewifiname(newname, callback){ //change the wifi name (ssid)
    
var data = fs.readFileSync(hostapdfile).toString().split("\n"); //get hostpad conf file data, and get every lines in a array
data[3] = "ssid=" +  String(newname) //edit 4th line with ssid=new password
var text = data.join("\n"); //reconstitute the conf file but with new ssid

fs.writeFile(hostapdfile, text, function (err) { //write news
  if (err) return callback(null, err);
  callback('done',null)
});
}

function changepassword(newpassword, callback){
    
var data = fs.readFileSync(hostapdfile).toString().split("\n");
data[11] = "wpa_passphrase=" +  String(newpassword)
var text = data.join("\n");

fs.writeFile(hostapdfile, text, function (err) {
  if (err) return callback(null, err);
  callback('done',null)
});
}
module.exports = {rebootrpi, rebootsoft, ethernetstatus, ethernetwritestatus, startethernet, stopethernet, changewifiname, changepassword} //export fonctions
