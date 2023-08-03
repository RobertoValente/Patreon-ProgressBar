# Patreon-ProgressBar
| **Percentage** |                  **Result**                 |
|:--------------:|:-------------------------------------------:|
|     **0%**     | <img src="https://i.imgur.com/xhEB25y.png"> |
|     **50%**    | <img src="https://i.imgur.com/dn4gXY5.png"> |
|    **100%**    | <img src="https://i.imgur.com/XJI645w.png"> |

➜ **Project asked by a Portugues YouTuber ([Pedro Lourenço](https://www.youtube.com/@pedrolllourenco))** maded with success! He **will use it for a LiveStream** on his channel.
<br>But for who doesn't understand, this is a Patreon Counter like the Sub Counter for Twitch Subs.

# 📌 Requirements
| Software |                   Donwload Link                   | Older Version Tested | Status |
|:--------:|:-------------------------------------------------:|:--------------------:|:------:|
|  NodeJS  | [Download NodeJS](https://nodejs.org/en/download) |       v16.15.1       |    ✅   |
|    NPM   |                    *from NodeJS                   |        v8.13.0       |    ✅   |
|    Git   |   [Download Git](https://git-scm.com/downloads)   |        v2.36.1       |    ✅   |
|    Patreon Account   |   [Patreon](https://patreon.com)   |        - - - -       |    ✅   |

# 📌 How to use
```console
# Clone this repository
git clone https://github.com/RobertoValente/ovh-backup.git

# Navigate to the folder
cd ovh-backup

# Install all dependencies of the project
npm install

# Rename the file '.env.example' to '.env'
mv .env.example .env

# Change "XXXXXX" to the correct information (tips inside of '.env')
nano .env

# Run the project
npm start
```
- For **change the time of any action**, feel free to change <code>* * * * *</code>  of the lines that contains it.
```js
// => Examples:

cron.schedule('* * * * *', () => {
    let msg = `Executed every minute`;
    let cronType = 'EveryMinute';
    // Code here
    sendWhatsappMessage(msg, cronType);
}, {scheduled: true, timezone: 'Europe/Lisbon'});

cron.schedule('0 0 0 ? * * *', () => {
    let msg = `Executed one time per day at midnight`;
    let cronType = 'ExecutedAtMidnight';
    // Code here
    sendWhatsappMessage(msg, cronType);
}, {scheduled: true, timezone: 'Europe/Lisbon'});

```
- **To help you get the exacly time**, visit the site: https://www.freeformatter.com/cron-expression-generator-quartz.html

# 📌 To Run in Background and Infinitely
<em>*can be different for other devices/operating systems than Raspberry Pi Zero W</em>
```console
# Inside of 'ovh-backup.service', replace '<path>' to the current path of your project
# To see your current path, execute 'pwd' in terminal

# Add execetuable permission to 'index.js'
chmod +x index.js

# Copy the service file to '/etc/systemd/system'
sudo cp ovh-backup.service /etc/systemd/system

# Start the service
systemctl start ovh-backup.service

# To launch the service in boot
systemctl enable ovh-backup.service

# To you see the logs
journalctl -u ovh-backup.service
```
