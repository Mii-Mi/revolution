var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        javascriptEnabled: true,
        customHeaders: {
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
        }
    }
});

var url = 'https://www.acrimed.org/spip.php?page=archive_mois&date=2019-04',
    title = [],
    link = [],
    img = [],
    desc = [],
    arrJson = [],
    fs = require('fs');

function getTitle() {
    var title = document.querySelectorAll('h3');
    return Array.prototype.map.call(title, function (e) {
        return e.innerText;
    });
}
function getLink() {
    var link = document.querySelector('a');
    return Array.prototype.map.call(link, function (e) {
            return e.getAttribute('href'); 
    });
}
function getImg() {
    var img = document.querySelectorAll('.logo-right');
    return Array.prototype.map.call(img, function (e) {
        return e.getAttribute('src');
    });
}
function getDesc() {
    var desc = document.querySelectorAll('a span');
    return Array.prototype.map.call(desc, function (e) {
        return e.innerText;
    });
}
function createJSON() {
    for (i = 0; i < title.length; i++) {
        arrJson.push({
            title: title[i],
            link: 'https://www.acrimed.org/' + link[i],
            img: 'https://www.acrimed.org/' + img[i],
            desc: desc[i],
            social: {
                facebook: 'https://www.facebook.com/pages/Acrimed-Action-Critique-M%C3%A9dias/94089796249',
                twitter: 'https://twitter.com/acrimed_info'
            }
        });
    }
    return JSON.stringify(arrJson);
};

casper.start(url, function () {
    this.echo('Start ...');
});

casper.waitForSelector('.arcbloc',
    function () {
        console.log('... The page is loaded ...');
    });

casper.then(function () {
    title = this.evaluate(getTitle);
});

casper.then(function () {
    link = this.evaluate(getLink);
});

casper.then(function () {
    desc = this.evaluate(getDesc);
});

casper.then(function () {
    img = this.evaluate(getImg);
});

casper.then(function () {
    for (i = 0; i < title.length; i++) {
        this.echo(' - ' + title[i] + ', ' + link[i] + ', ' + desc[i] + ', ' +  img[i]);
    }
});



casper.then(function () {
    var data = createJSON();
    fs.write('result.json', data, 'w');
});

casper.then(function () {
    this.echo("... Done :) ").exit();
});

casper.run();