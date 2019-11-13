apt-get update
apt-get upgrade
sudo apt install dnsmasq hostapd
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd

if command -v python &>/dev/null; then
    echo Python 3 is installed
else
    sudo apt-get install python3.6
fi


install.py dhcpcd

sudo service dhcpcd restart


sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
install.py dnsmasq 


sudo systemctl start dnsmasq
sudo systemctl reload dnsmasq

install.py hostapdconf


install.py daemonhostapd


sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd

install.py forward
sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"

install.py restore
#https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md
