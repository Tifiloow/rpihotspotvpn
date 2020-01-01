# - **Rpihotspotvpn**
Rpihotspotvpn is a script using express, nodejs, and angular.
It permits to create a wifi hostpot with a rasberry pi.
It has the advantage of having a script installing itself everything needed to make a wifi hotspot with a rasberry pi (3 or +) with hostapd, and dnsmasq.

It has a panel to see connected users, stop the wifi (but keep the pannel on), start the wifi, and even add a vpn (in dev. system)

#### Please test the program and report bugs - very easy to fix - create issues 

---
## How to install - On a rasberry pi
*You must have git installed*
`sudo git clone https://github.com/tifiloow/rpihotspotvpn`
Go into the install folder of the project && start start_install.sh:
`cd /rpihotspotvpn/install && chmod +x start_install.sh && ./start_install.sh`
It will ask some questions, generate some keys,  and finally it will ask to reboot the pi.
#### Note: A uninstall file exists

---
## How to use it
To access the pannel, you must have the rasberry pi's ip.
Go on your phone or your computer, and visit:
https://**rpi-ip**:2000/
Tell the navigator this website is safe (it's the api) and it works !
**Enjoy !**
###### /!\Go in config.js and modify the secret ! Very important for the security /!\
---
### Note:
The project is not finished yet !
The vpn system hasn't been implemented in the angular frontend.
But it would be simply, because it's already done in the api for nordvpn(most known vpn)
The nordvpn api system hasn't been tested too, but it can be done very quickly, everything already done, and just have to implement some requests in the frontend.

What could be better/added easily : 
- verify start_install (not tested on my rasberry pi yet even if globally it should be fine)
- add everything to uninstall.sh
- finish vpn system (for nordvpn or other system, very easy with openvpn)
- add loading system and more css + use more boostrap #for the ui
- add a few comments or clarify some, but had a lot of anoying errors, so i didn't take care of the comments some times.
- verify security (it should be good, but can increase security in the login system by changing errors (for bruteforce and list usernames,...))
- check the register system with the verification for only one user
- Beautify javascript


-------------------
### How to contribute

You can make pull requests, do not forget when editing angular-frontend to run "ng build --prod" in /angular-frontend
You can report bugs too, if it do not work I'll correct it

-------------------

*Written by Théophile.Jr*
https://github.com/tifiloow