#this .py is used to edit files to make the hotspot work https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md
import sys
argument = []
try:
    argument = sys.argv[1] #give the argument to the argument array
    print('arg given')
except:
    print("No arg given")
    exit()

if argument[0] == "dhcpcd":
    pass
    '''sudo nano /etc/dhcpcd.conf
Go to the end of the file and edit it so that it looks like the following:
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
Now restart the dhcpcd daemon and set up the new wlan0 configuration:
'''
elif argument[0] == "dnsmasq":
    pass
    '''
    créer nouveau :
sudo nano /etc/dnsmasq.conf
interface=wlan0      # Use the require wireless interface -
usually wlan0
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
'''
elif argument[0] == "hostapdconf":
    pass
    '''sudo nano /etc/hostapd/hostapd.conf
//faudrait faire install mon fichier conf
interface=wlan0
driver=nl80211
ssid=NameOfNetwork
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=AardvarkBadgerHedgehog
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
'''
elif argument[0] == "daemonhostapd":
    pass
    '''
sudo nano /etc/default/hostapd
Find the line with #DAEMON_CONF, and replace it with this:

DAEMON_CONF="/etc/hostapd/hostapd.conf"
'''
elif argument[0] == "forward":
    pass

'''
Edit /etc/sysctl.conf and uncomment this line:

net.ipv4.ip_forward=1
'''
elif argument[0] == "restore":
    pass
'''
Edit /etc/rc.local and add this just above "exit 0" to install these rules on boot.

iptables-restore < /etc/iptables.ipv4.nat
'''
else:
    print("No argument known")