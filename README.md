# OpenX
ShareX Upload Server 

# Features

- Image/Video/Gif & Many More File Uploading
- Password Protected Admin Dashboard
  - [Demo](https://demo-openx.wizq.dev)
- Frontend Upload Page [Example](https://demo-openx.wizq.dev/i/07kZNXFt.png)


# Using Virutal / Dedicated Servers
<details open>
  <summary>Installation</summary>
  
# Installation (Ubuntu, Debian)

```bash
git clone https://github.com/Wizqdev/OpenX/
cd OpenX
npm i
```

# Configuration
```json
{
    "Web": {
        "Port": "3000", // Port you want OpenX to use
        "Domain": "https://demo-openx.wizq.dev", // Domain Name 
        "Secret": "QfBWV8{hX-#;{B#Yi.}Zx1wNMN4jQ53.^3{/F=3sEq(hh)7rwT" // Random Hash can also be generated from [wizq.dev](https://wizq.dev/tools/password-generator)
    },
    "Key": "123456789", // ShareX Password for Private Uploading
    "fileNameLength": 8, // File Name Length
    "maxUploadSize": 1024, // Max Upload Size
    "allowedFileTypes": {
        "image": [".png", ".jpg", ".gif", ".webp", ".ico", ".raw"],
        "video": [".mp4", ".gifv"],
        "audio": [".mp3"],
        "html": [".html"]
    }, // Allowed File Types
    "Admin": {
        "Username": "Admin", // Dashboard Username
        "Password": "Admin"  // Dashboard Password
    }
}
```
# Running The Server 
Onces you've properly configured your server you can run `node .`
You can keep your server runing forever if you use a process manager, like PM2. PM2 can be installed along side the OpenX Server.
`npm i -g pm2` To Install Pm2
`pm2 start Src/index.js` To Start The OpenX Forever
`pm2 monit` To View Logs 

</details>


# Using DBH [Free Hosting]
<details open>
<summary>Installation Using DBH (Dan Bot Hosting)</summary>

First join the Discord server [DBH / Dan Bot Hosting](https://discord.gg/dbh)<br />
If you are a new user please run the following command to create an account.< <br />
`DBH!user new`<br />
After creating your account, link your account to the panel by running the following command.<<br />
`DBH!user link`<br />
Once the linking is complete, you can create an OpenX server by running the following command.<br />
`DBH!server create OpenX OpenX` <br />
If you are a donate in the DBH server, use the following command instead.<br />
`DBH!server create-donator OpenX OpenX`<br />

Thats it, login in to the panel and you will see a server with the name [OpenX].<br />
Go to the startup bar in and configure your OpenX Instance. The server port should already be configured, the rest are editable in the startup tab of the panel!<br />

[Dan (Owner of DBH) made a custom egg for DBH clients to use OpenX]
</details>

# Demo 

Link: https://demo-openx.wizq.dev/<br />
Username: Admin<br />
Password: Admin

<h2>A Few Images of OpenX</h2>
![image1](https://github.com/Wizqdev/OpenX/assets/87972700/db562b06-a324-4f72-b4f2-a874bec1f3df)<br />
![image2](https://github.com/Wizqdev/OpenX/assets/87972700/2fb4de3a-80d5-4b7f-a162-276c58842be2)<br />
![image3](https://github.com/Wizqdev/OpenX/assets/87972700/67723c4d-0748-495a-b911-a30ea4bff9bf)<br />
![image4](https://github.com/Wizqdev/OpenX/assets/87972700/8c16fa18-2606-4544-854e-e3c77859d765)<br />


<h2>Hosted at DBH</h2>


# Todo
[ ] Url Shortner<br />
[ ] Paste Bin<br />
[x] Multi-User<br />
[ ] Multi-Database Support<br />
[ ] Discord Bot Integration<br />
[ ] 2FA System<br />
[x] Api<br />

