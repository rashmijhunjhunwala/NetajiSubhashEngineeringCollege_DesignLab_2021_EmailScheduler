const express = require('express')
let nodemailer = require('nodemailer');
let cron = require('node-cron');
const app = express()
const port = 3000

app.use(express.json())

const dateToCron = (date) => {
    console.log(date)
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};


let data = { 
  "emails":[
    {"to":"rashmijhunjhunwala068@gmail.com", "subject":"Hello" , "text":"Ssup" ,"sec":'4 * * * * *'},
    {"to":"jhunjhunwalarashmi2@gmail.com", "subject":"Hello 2" , "text":"Ssup","sec":'40 * * * * *'},
    {"to":"rashmij.cse2017@nsec.ac.in", "subject":"Hello 3" , "text":"Ssup","sec":'50 * * * * *'}
  ]
}

for(let i = 0; i<data.emails.length;i++) {

let mailOptions = {
    from: 'test52616@gmail.com',
    to: data.emails[i].to,
    subject: data.emails[i].subject,
    text: data.emails[i].text
};

// e-mail transport configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'test52616@gmail.com',
      pass: 'Test1234!'
    }
});


cron.schedule(data.emails[i].sec, () => {
  console.log("Sending Mail");
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
}


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})