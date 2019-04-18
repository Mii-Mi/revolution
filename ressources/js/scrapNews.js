let data = [
                {
                    title: "ThinkerView",
                    link: "https://thinkerview.com/",
                    img: "../../ressources/images/logos/thinkerview.jpg",
                    desc: "ThinkerView est un laboratoire d'idées français indépendant lancé en janvier 2013, proche du milieu du hacking... ",
                    social: {
                        facebook: "https://facebook.com/thinkerview",
                        twitter: "https://twitter.com/Thinker_View"
                    }
                },
                {
                    title: "Brut",
                    link: "https://thinkerview.com/",
                    img: "../../ressources/images/logos/thinkerview.jpg",
                    desc: "ThinkerView est un laboratoire d'idées français indépendant lancé en janvier 2013, proche du milieu du hacking... ",
                    social: {
                        facebook: "https://facebook.com/thinkerview",
                        twitter: "https://twitter.com/Thinker_View"
                    }
                },
                {
                    title: "Le Media",
                    link: "https://thinkerview.com/",
                    img: "../../ressources/images/logos/thinkerview.jpg",
                    desc: "ThinkerView est un laboratoire d'idées français indépendant lancé en janvier 2013, proche du milieu du hacking... ",
                    social: {
                        facebook: "https://facebook.com/thinkerview",
                        twitter: "https://twitter.com/Thinker_View"
                    }
                }
            ]

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

function load(){
    let articles = [];
    for(i=0; i < data.length; i++){
        articles.push(new Article(data[i].title, data[i].link, data[i].img, data[i].desc, data[i].social.facebook, data[i].social.twitter));
    }

    for (i=0; i < articles.length; i++){
        articles[i].displayArticle();
    }
};

load();
