const readline = require('readline');
const chalk = require('chalk');
const moment = require('moment');
const YtdlCore = require('ytdl-core');
const fs = require('fs');

const Version = require('./package.json').version;

let Tarih = chalk.gray(moment().format("HH:mm:ss YYYY-MM-DD"));
let Question = chalk.yellow.bold('QUESTION');
let Err = chalk.red.bold('ERROR');

let ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ReadLine.question('Version '+Version+'\n\n'+Tarih+' '+Question+' Type Video URL to Download.\nAnswer: ', async(Url) => {
    if (!Url.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/)) {
        console.log(Tarih+' '+Err+' The Url You Entered Is Not A YouTube Url!');
        ReadLine.close();
    };
    ReadLine.question(Tarih+' '+Question+' Select Type of Video to Download (mp3 or mp4)\nAnswer: ', async(VideoTipi) => {
        if (!VideoTipi.match(/mp3|mp4/)) {
            console.log(Tarih+' '+Err+' The Video Types You Wrote Were Not mp3 Or mp4.');
            ReadLine.close();
        };
        ReadLine.question(Tarih+' '+Question+' Can you write the name of the video you want to download?\nAnswer: ', async(VideoName) => {
            console.log(Tarih+' '+chalk.green.bold('SUCCESS')+' Video Found, Downloading.');
            YtdlCore(Url).pipe(fs.createWriteStream(VideoName+'.'+VideoTipi)).on('finish', async() => {
                console.log(Tarih+' '+chalk.green.bold('SUCCESS')+' File Downloaded Successfully!')
                ReadLine.close();
            });
        });
    });
});


ReadLine.on('close', () => {
    process.exit(0);
});
