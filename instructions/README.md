# DNS Entry, Certificate, HTTPS, and Cookies Lab

## Overview
This lab focuses on creating a DNS entry for a server, obtaining an SSL certificate, enabling HTTPS, and exploring basic cookie functionality. By completing this lab, you will gain practical experience in setting up secure web connections and managing cookies.

## Functionality
1. Create a DNS entry for your server.
2. Obtain an SSL certificate using Certbot.
3. Configure your web server to enable HTTPS with the obtained certificate.
4. Implement basic cookie functionality in a web application.

## Concepts
1. DNS (Domain Name System)
2. SSL (Secure Sockets Layer) certificate
3. HTTPS (Hypertext Transfer Protocol Secure)
4. Cookies and their usage in web applications

## Instructions

### Step 1
DNS Entry:
- Log in to your domain registrar or DNS hosting provider.
- Access the DNS management section.
- Create a new DNS record (A or CNAME) pointing to your server's IP address or hostname.
### Step 2

Certificate:
- Install Certbot on your server as per the instructions for your operating system.
- Open a terminal or command prompt and run Certbot's command for obtaining a certificate, using the `--manual` option and your domain name.
### Step 3

HTTPS Configuration:
- Locate the configuration file for your web server (e.g., Apache, Nginx).
- Open the file in a text editor.
- Find the virtual host section for your domain.
- Add the necessary lines to enable HTTPS, including the paths to your certificate files.
- Save the configuration file and restart or reload the web server.
### Step 4

Cookie Setup:
- Choose a server-side programming language (e.g., PHP, Python, Node.js) and set up a basic web application.
- Create an endpoint or script to handle requests.
- Implement cookie handling using the language's built-in libraries or frameworks.
- Test cookie functionality by setting, reading, and deleting cookies within your application.

## Tips
1. Double-check your DNS entry to ensure it accurately points to your server.
2. Follow the Certbot instructions carefully to successfully obtain the SSL certificate.
3. Make sure to secure your certificate files and update them when they expire.
4. Test your HTTPS configuration to ensure a secure connection.
5. Familiarize yourself with the documentation of your chosen server and programming language for specific instructions.

## Passoff Requirements
To successfully complete this lab, you must:
1. Provide documentation or screenshots demonstrating the DNS entry creation.
2. Share the SSL certificate files obtained using Certbot.
3. Present the modified web server configuration file with the HTTPS settings.
4. Demonstrate the functioning of the cookie implementation within your web application.
5. Answer any questions related to the lab concepts and your setup.

**Note:** Adapt the lab instructions and requirements as needed to align with your specific server setup, programming language, and lab environment.