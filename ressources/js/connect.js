session = sessionStorage.getItem('connect');


// Admin menu hidden at start 
const admin = document.getElementById('admin');
const adm = ('<a>Admin</a><ul><li><a href="#">Articles</a><ul><li><a href="#">Membres</a><ul><li><a href="#">stats</a><ul><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul>');
localStorage.setItem('adminPanel', adm);


// Connection button
const connect = document.getElementById('connect');
const linkCo = document.getElementById('linkCo');

// Disconnection buttons hidden at start
const disconnect = document.getElementById('deco');
const linkDeco = document.getElementById('linkDeco');

if (session === 'true'){
    connect.style.display = 'none';
    disconnect.style.display = 'inline-block';
    admin.style.display = 'inline-block';
    admin.innerHTML = localStorage.getItem('adminPanel');
}else{
    disconnect.style.display = 'none';
}

// events
connect.onclick = co;
disconnect.onclick = disc;

// Connect function
function co() {
    let mdp = prompt('entrez votre mot de passe');
    if (mdp === 'Castaner') {
        linkCo.removeAttribute('href');
        connect.style.display = 'none';
        admin.style.display = 'inline-block';

        admin.innerHTML = localStorage.getItem('adminPanel');
        disconnect.style.display = 'inline-block';

        //recharger la navbar
        jQuery(document).ready(function ($) {
            jQuery('.stellarnav').stellarNav();
        });
        sessionStorage.setItem('connect', true);
    } else {
        alert('Mdp invalide');
    }
}

// Disconnect function
function disc() {
    admin.style.display = 'none';
    disconnect.style.display = 'none';
    connect.style.display = 'inline-block';
    sessionStorage.clear();
}