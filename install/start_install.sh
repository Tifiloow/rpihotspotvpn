sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt install dnsmasq hostapd -y
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd

if command -v python &>/dev/null; then
    echo Python 3 is installed
else
    sudo apt-get install python3.6 -y
fi

sudo npm install body-parser mongoose bcryptjs express jsonwebtoken -y

sudo install.py dhcpcd -hadrien

sudo service dhcpcd restart

//openssl


sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo install.py dnsmasq -copier coller fichier


sudo systemctl start dnsmasq
sudo systemctl reload dnsmasq

sudo install.py hostapdconf - copier coller .conf


sudo install.py daemonhostapd -adrien


sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd

sudo install.py forward - adrien
sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"

sudo install.py restore - adrien
#https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md

