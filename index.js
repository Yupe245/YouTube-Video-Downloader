const readline = require('readline');
const chalk = require('chalk');
const moment = require('moment');
const YtdlCore = require('ytdl-core');
const fs = require('fs');

let Tarih = chalk.gray(moment().format("HH:mm:ss YYYY-MM-DD"));
let Question = chalk.yellow.bold('QUESTION');
let Err = chalk.red.bold('ERROR');

let ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ReadLine.question(Tarih+' '+Question+' Type Video URL to Download.\nAnswer: ', async(Url) => {
    if (!Url.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/)) {
        console.log(Tarih+' '+Err+' The Url You Entered Is Not A YouTube Url!');
        ReadLine.close();
    };
    ReadLine.question(Tarih+' '+Question+' Select Type of Video to Download (mp3 or mp4)\nAnswer: ', async(VideoTipi) => {
        if (!VideoTipi.match(/mp3|mp4/)) {
            console.log(Tarih+' '+Err+' The Video Types You Wrote Were Not mp3 Or mp4.');
            ReadLine.close();
        };
        console.log(Tarih+' '+chalk.green.bold('SUCCESS')+' Video Found, Downloading. When the video downloads by checking the file, you can exit by pressing the Ctrl + C keys.');
        YtdlCore(Url).pipe(fs.createWriteStream('YouTube Downloader.'+VideoTipi));
    });
});


ReadLine.on('close', () => {
    process.exit(0);
});