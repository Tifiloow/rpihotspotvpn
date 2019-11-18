const express = require('express')
auth = require('./auth');
const router = express.Router()
const exec = require('child_process').exec
const fs = require('fs');
fonctions = require('./api-fonctions') //important functions
config = require('../config');



router.get('/', async(req, res) => {
    res.send({
        message: '/api portal', success: false});
}); //message at the root of the api 

//api request to reboot a part of the rpi // soft or the rpi itself
router.get('/reboot', async(req, res) => {
    if (req.query.type === 'rpi') {
        res.json({
            message: 'triggered rpi reboot', success : true});
        fonctions.rebootrpi() //reboot rpi
    } else if (req.query.type === 'soft') {
        fonctions.rebootsoft((err)=>{ //callback
            if(err){res.json({success:false, error: error})}
            res.json({
                message: 'triggered soft reboot', success: true,
            });
        }) //reboot soft
    } else {
        res.json({
            message: 'need type: rpi or soft', success: false //return an error, no parameter were given
        });
    }
});



router.get('/getinfo', async(req, res) => { //get informations request : npm and app version
    const versionreq = exec('npm -v');
    versionreq.stdout.on('data', function(data) {
        res.json({
           success: true, 
           npm: data,
           version: config.version,
        });
    })

});



router.get('/startwifi', async(req, res) => { //request to enable the ethernet on rpi --> give internet to the connected devices
    fonctions.startethernet(res)

});
router.get('/stopwifi', async(req, res) => { //request to stop the ethernet on the pi --> r emove internet to the connected devices without kicking or stoping the access point
    fonctions.stopethernet(res)
});

router.get('/getusers', async(req, res) => { //get connected users
    usersreq = exec("arp | cut -d ' ' -f 1 | sed '1d'") //exec linux batch command to get connected devices
    usersreq.stdout.on('data', function(data) {
res.send({users: data, success: true});
});
    });


router.get('/ethernetstatus', async(req, res) => { //know if the ethernet is on or not --> is connection delivered ? 
    fonctions.ethernetstatus((status)=>{
           res.send({success: true,status: status});
        });
 
});

router.get('/changessid', async(req, res) => { //change the ssid of the hotspot
    if(req.query.ssid){ //verify parameters
    fonctions.changewifiname(req.query.ssid, (result, err)=>{
    if(err) return res.send({success: false}) //error, api returns error
    res.send({message: 'changed name, rebooting', success: true})
    fonctions.rebootsoft()  //rebootsoft -dnsmasq hostapd
    });
    
    }
 
});

router.get('/changepassword', async(req, res) => { //request to change wifi hotspot password
    if(req.query.password){ //verify parameters
    fonctions.changepassword(req.query.password, (result, err)=>{
    if(err) return res.send({error: err, success: false})//error, api returns error
    res.send({message: 'changed password, rebooting', success: true})
    fonctions.rebootsoft() //reboot soft
    });
    
    }
 
});

module.exports = router;