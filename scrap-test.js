var casper = require("casper").create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        javascriptEnabled: true,
        customHeaders: {
            acceptEncoding: "gzip, deflate, br",
            acceptLanguage: "fr-FR,fr;q=0.9,ar;q=0.8,fr;q=0.7",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3766.0 Safari/537.36"
        }
    }
});

// var url = 'https://www.cdiscount.com/informatique/ecran-pc/l-10710.html',
var url = 'https://www.acrimed.org/spip.php?page=archive_mois&date=2019-04',
    title = [],
    date = [],
    descr = [],
    // type = [],
    img = [],
    arrJSON = [],
    fs = require('fs');

console.log(fs);


function getTitle() {
    var title = document.querySelectorAll('h3');
    return Array.prototype.map.call(title, function (e) {
        return e.innerText;
    });

}

// post-title

function getDescription() {
    var descr = document.querySelectorAll('a');
    return Array.prototype.map.call(descr, function (e) {
        return e.innerText;
    });
}


// class="category link-effect-parent"



function getImg() {
    var img = document.querySelectorAll('.logo-right');
    return Array.prototype.map.call(img, function (e) {
        return e.getAttribute('src');
    });
}

// attachment-thumbnail size-thumbnail wp-post-image

function getDate() {
    var date = document.querySelectorAll('h2');
    return Array.prototype.map.call(date, function (e) {
        return e.innerText;
    });
}

// class="date"

// function getType() {
//     var type = document.querySelectorAll('');
//     return Array.prototype.map.call(type, function (e) {
//         return e.getAttribute('href');
//     });
// }

// category link-effect-parent

function createJSON() {
    for (index = 0; index < date.length; index++) {
        arrJSON.push({
            title: title[index],

            descr: descr[index],

            date: date[index],

            // type: type[index],

            img: img[index]

        });
    }
    return JSON.stringify(arrJSON);
};

// function createElement(parent, title, content) {
//   var titleDiv = document.createElement("div");
//   titleDiv.innerHTML = title + content;
//   parent.appendChild(titleDiv);
// }


casper.start(url, function () {
    this.echo("Start ...");
});

casper.waitForSelector('.arcbloc', function () {
    console.log('... The page is loaded ...');
});

// container inner

casper.then(function () {
    title = this.evaluate(getTitle);
});

casper.then(function () {
    descr = this.evaluate(getDescription);
});

casper.then(function () {
    img = this.evaluate(getImg);
});


casper.then(function () {
    date = this.evaluate(getDate);
});

// casper.then(function () {
//     type = this.evaluate(getType);
// });


casper.then(function () {
    for (index = 0; index < title.length; index++) {
        this.echo(' - ' + title[index] + ', ' + descr[index] + ', ' + date[index] + img[index]);
    }
});

casper.then(function () {
    var data = createJSON();
    fs.write('pub.json', data, 'w');
});
/*
casper.then(function() {
  var body = document.getElementsByTagName('body')[0],
    table = document.createElement('table'),
    br = document.createElement("br"),
    tbdy = document.createElement('tbody'),
    script = document.createElement("link");
  script.setAttribute("rel", "stylesheet");
  script.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");

  body.appendChild(script);
  table.style.width = "50%";
  table.setAttribute('border', '1');
  table.setAttribute("class", "table");
  for (index = 0; index < title.length; index++) {
    var tr = document.createElement('tr'),
      td1 = document.createElement('td'),
      td2 = document.createElement('td'),
      img = document.createElement('img');

    createElement(td1, 'Title: ', title[index]);
    createElement(td1, 'Description: ', description[index]);
    createElement(td1, '', price[index]);
    createElement(td1, 'Reviews: ', reviews[index]);

    img.setAttribute('src', picture[index]);
    img.setAttribute('width', '200px');
    td2.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbdy.appendChild(tr);
  }
  table.appendChild(tbdy);
  body.appendChild(table);
  fs.write('test-scrap.html', body.outerHTML, 'w');
});*/

casper.then(function () {
    this.echo("... Done :) ").exit();
});

casper.run();
