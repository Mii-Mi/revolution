function scrap(){
    var links = [];
    var casper = require('casper').create({
        verbose: false,
        logLevel: 'debug',
        pageSettings: {
            loadImages: false,
            loadPlugins: false,
            javascriptEnabled: true,
            customHeaders:{
                userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
            }
        }
    });

    var url = 'https://www.acrimed.org/spip.php?page=archives',
        title = [],
        link = [],
        img = [],
        desc = [],
        arrJson = [],
        fs = require('fs');

    function getTitle(){
        var title = document.querySelectorAll('h3');
        return Array.prototype.map.call(title, function(e){
            return e.innerText;
        });
    }
    function getLink(){
        var link = document.querySelectorAll('a');
        return Array.prototype.map.call(link, function(e){
            return e.innerText;
        });
    }
    function getImg(){
        var img = document.querySelectorAll('.logo-right');
        return Array.prototype.map.call(img, function(e){
            return e.getAttribute('style').slice;
        });
    }
    function getDesc(){
        var desc = document.querySelectorAll('h3');
        return Array.prototype.map.call(desc, function(e){
            return e.innerText;
        });
    }
    function createJSON(){
        for (i = 0; i < title.length; i++){
            arrJson.push({
                title: title[i],
                link: link[i],
                img: img[i],
                desc: desc[i],
                social:{
                    facebook: 'https://www.facebook.com/pages/Acrimed-Action-Critique-M%C3%A9dias/94089796249',
                    twitter: 'https://twitter.com/acrimed_info'
                }
            });
        }
        return JSON.stringify(arrJson);
    };
    
    casper.start(url, function(){
        this.echo('Start ...');
    });

    casper.waitForSelector('section',
    function(){
        console.log('... The page is loaded ...');
    });

    mkDom();
}

function mkDom(){
    var requestURL = 'news.json';
    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var data = request.response;
        console.log(data);
        
        load(data);
    }

    let Article = function(title, link, img, desc, fb, tw){
        this.title = title,
        this.link = link,
        this.img = img,
        this.desc = desc,
        this.fb = fb,
        this.tw = tw
    }
    Article.prototype.displayArticle = function(){
        let article = document.querySelector('#cont');
        let newArt = document.createElement('article');
        newArt.className = 'bloc';
        article.appendChild(newArt);
        
        newArt.innerHTML = `
            <a class="link-publi" href="${this.link}">
                <figure>
                    <figcaption class="title-publi">${this.title}</figcaption>
                    <img class="img-publi" src="${this.img}" alt="logo" />
                </figure>
            </a>
            <p class="descr-publi">${this.desc}</p>

            <div class="social social-publi">
                <p><a href="${this.fb}"><img
                    src="../../ressources/images/logos/facebook.png" alt="logo facebook" /></a></p>
                <p><a href="${this.tw}"><img src="../../ressources/images/logos/twitter.png"
                    alt="logo twitter" /></a></p>
            </div>`;
        console.log(newArt);
    }

    function load(data){
        let articles = [];
        for(i=0; i < data.length; i++){
            articles.push(new Article(data[i].title, data[i].link, data[i].img, data[i].desc, data[i].social.facebook, data[i].social.twitter));
        }

        for (i=0; i < articles.length; i++){
            articles[i].displayArticle();
        }
    };
}

scrap();
