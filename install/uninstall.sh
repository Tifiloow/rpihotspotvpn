echo -n "Sure to remove ?"
read answer
if [ "$answer" != "${answer#[Yy]}" ] ;then
    


    sudo apt-get update -y
    sudo apt-get upgrade -y

    sudo apt remove dnsmasq hostapd -y #don't remove openssl&npm because could be already installed
    sudo npm uninstall body-parser mongoose bcryptjs express jsonwebtoken -y
    sudo rm ../server.key
    sudo rm ../server.cert
    #other changes must be done mually, ok create an issue at github.com/tifiloow/rpihotspotvpn
else
    echo Ok.
fi