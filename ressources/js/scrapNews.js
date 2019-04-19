
var requestURL = '../../ressources/js/result.json';
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
                <h3 class="title-publi">${this.title}</h3>
                <img class="img-publi" src="${this.img}" alt="logo" />
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