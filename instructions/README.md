# DNS Entry, Certificate, HTTPS

## Overview
This lab focuses on creating a DNS entry for a server, obtaining an SSL certificate, enabling HTTPS. By completing this lab, you will gain practical experience in setting up secure web connections.

## Functionality
1. Create a DNS entry for your server.
2. Obtain an SSL certificate using Certbot.
3. Configure your web server to enable HTTPS with the obtained certificate.
4. Redirect incoming traffic from HTTP to HTTPS
5. Create an Alias domain for your site.

## Concepts
1. DNS (Domain Name System)
2. SSL (Secure Sockets Layer) certificate
3. HTTPS (Hypertext Transfer Protocol Secure)

## Instructions

### Step 1
Establishing a static IP:
- Before we can link the production server to a domain we must establish a static IP.  
  - In the AWS console under the `Network & Security` section select `Elastic IPs`
    - On the right hand side select `Allocate Elastic IP address`
    - Leave the default settings and select `Allocate`
    - Select on the IP address under the `Allocated IPv4 address` column
    - Select `Associate Elastic IP address`
    - In the text box labeled `Instance` select the name of the instance you want to be assosiated with the static IP address and then select `Associate`
    - To test if it worked correctly SSH into your server using the static IP address. The IP that appears in the terminal should be the same as the `Private IP Address` listed with the elastic IP just created


### Step 2
DNS Entry:
- Log in to your domain registrar or DNS hosting provider.
    1. For our purposes, we have created a DNS Server for the class. Go to LMS, click the Content tab >> Tools >> DNS. Click the link. This will show you a list of all DNS records you have claimed. 
    1. Here you will need to claim a domain before anything else.
        - For this lab you will be claiming a subdomain of our class domain itc210

    1. Create an `A Record` This will map your domain to the elastic IP
        - Note: A records are used to map a domain to a specific IP. CNAME records are another way of mapping domains but they do not directly map to an IP addresss, instead these must point to a target domain. CNAME records are useful for making alias for server, but they should be connected a domain with an A record to reduce potential overhead.
        
    1. Now to test! Enter your favorite browser and insert `<your_domain>.itc210.net` into the url. Now you should see your Lab2a webpage.

### Step 3

Certificate:
- Update and upgrade your server 
- Install Certbot. Check to see if Certbot is already installed by entering `certbot` into the command prompt. If installed remove with `sudo snap remove certbot` This is to avoid using the outdated `certbot-auto` by mistake. Next install `sudo snap install --classic certbot`
- Get your cert by entering `sudo certbot certonly --manual`
This will create a cert that then needs to be validated. Make another ssh connection to your server and create the specified file in the appropriate path in the src directory of your website. `/var/www/<lab name>/src/.well-known/acme-challenge/<filename>`
- Because manual was used this process will have to be repeated in 3 months to renew the cert
- You may also use Cerbot's apache option. This will verify your domain, install a cert and configure HTTPS. Still walk through step 4 and 5 to understand changes in your configuration files. They will be named slightly different, but you will still be responsible for understanding how they work.


### Step 4

HTTPS Configuration:
- Locate the configuration file for your web server.
1. Go to conf file at `/etc/apache2/apache2.conf` This is the main config file for apache2. We won't modify this file but it is a good reference if you want to understand the structure of the conf files and the tools apache uses to enable them.
2. Go to ssl conf file at `/etc/apache2/mods-available` to verify existance
3. In the command line enter 
```
sudo a2enmod ssl
```
 this is a command for apache2 to enable its ssl conf file
4. Restart the system as prompted
5. Now check that to see that the ssl.conf and ssl.load were moved/ generated in `/mods-enabled`
6. next in the `sites-available` directory create a new configuration file based on the default.
```code
sudo cp default-ssl.conf it210_secure.conf
```
7. Open a new terminal and ssh into your server. Find the path to your cert by using 
```
sudo certbot certificates
```
8. sudo into it210_secure.conf and add `ServerName <yourdomain>.itc210.net` in between the `<VirtualHost _default_:433></VirtualHost>` tags. We do this so that the server will know which ssl certificate to use for our domain if multiple ssl.conf files are active.  Also add the path of the cert to `SSLCertificateFile` and then the private key after `SSLCertificateKeyFile`
```
Hint: if you don't know how to copy and paste in linux this is a great time to google it.
```
9.  Make sure that the modification made to the it210_lab.conf were made to the new conf file.

10. Enable the new conf file with
``` 
sudo a2ensite it210_secure.conf
```
11. Run 
```
sudo service apache2 reload
```
Now check status and visit the site with HTTPS.
If the browser cannot connect to your site you most likely have an error in your configuration file. Run `sudo service apache2 status` If you see errors disable your it210_secure.conf and enabled it210_lab.conf. Run `sudo service apache2 start` Go back to step 8 and find your error.

### Step 5
Redirecting HTTP to HTTPS:
Enabling HTTPS does not prevent traffic from entering your site via HTTP. There are a few ways to forward HTTP to HTTPS. Our solution will be to modify Virtual Host parameters in our it210_lab.conf. It210_lab.conf is used with all incoming requests from port 80.
1. Open the conf file and within the VirtualHost tags insert
```
RewriteEngine on
RewriteCond %{SERVER_NAME} =<yourdomain>.itc210.net
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
```
Be able to explain what this code is doing and the meaning of the flags that are attached.

### Step 6
Now create an alias for you domain.
1. Go back to our class DNS and create a new Domain.
2. Create a CNAME record. Place the alias domain in the `Domain` box and your first domain in the `Target` box.
3. Now test your new alias domain in web browser. You should see that it is unsecure. This is because your certificate is tied
to the original domain you created. 
4. Now create a new cetificate and configure HTTPS. Make sure that the any HTTP requests to the alias domain are forwarded to HTTPS.



## Tips
1. Double-check your DNS entry to ensure it accurately points to your server.
1. Follow the Certbot instructions carefully to successfully obtain the SSL certificate.
1. Certbot has a options to auto configure renewal and step up HTTPS in apache2. If you
choose to use this option verify you understand what conf files were created and how they work. LetsEncrypt is special because they make configuration easy, other cert authorities do not provide this luxury. 
1. Make sure to secure your certificate files and update them when they expire.
1. Test your HTTPS configuration to ensure a secure connection.
1. Familiarize yourself with the documentation of your chosen server and programming language for specific instructions.

## Passoff Requirements
To successfully complete this lab, you must:
1. [] 13 points - Provide documentation or screenshots demonstrating the DNS entry creation.
2. [] 13 points - Show the SSL certificate files obtained using Certbot.
3. [] 13 points - Be able to explain how cert authorites validate the owner of a domain.
3. [] 13 points - Present the modified web server configuration file for HTTPS settings.
4. [] 13 points - Identify  and explain the code used to forward HTTP requests to HTTPS.
5. [] 13 points - Demonstrate that your orginal and alias domains function properly with HTTPS.
6. Answer any questions related to the lab concepts and your setup.


## Write Up Questions
1. How do cert authorities validate the owner of a domain?
2. Generally, what is needed to activate HTTPS on a server?
3. How do you forward HTTP requests for your domain to HTTPS?
4. Why would an alias domain be wanted?