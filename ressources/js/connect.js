session = sessionStorage.getItem('connect');


// Admin menu hidden at start 
const admin = document.getElementById('admin');
const adm = ('<a>Admin</a><ul><li><a href="#">Articles</a><ul><li><a href="#">Membres</a><ul><li><a href="#">stats</a><ul><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li><li><a href="#">Item</a></li></ul>');
localStorage.setItem('adminPanel', adm);

// Modal 
// ####################################################
let modal = null;

const openModal = function(e){
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e){
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e){
    e.stopPropagation();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

window.addEventListener('keydown', function(e){
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e);
    } 
    
})
// connection button
const connect = document.getElementById('connect');


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
// connect.onclick = co;

disconnect.onclick = disc;

// Connect function

//const linkCo = document.getElementById('linkCo');
const logForm = document.querySelector('#login-form');
logForm.addEventListener('submit', co)

 function co(e) {
//     let mdp = prompt('entrez votre mot de passe');
let mdp = document.getElementById('pass');
    
    if (mdp.value === 'Castaner') {
        //linkCo.removeAttribute('href');
        connect.style.display = 'none';
        admin.style.display = 'inline-block';

        admin.innerHTML = localStorage.getItem('adminPanel');
        disconnect.style.display = 'inline-block';

        //recharger la navbar
        jQuery(document).ready(function ($) {
            jQuery('.stellarnav').stellarNav();
        });
        sessionStorage.setItem('connect', true);

        //Close modal
        closeModal();

    } else {
        alert('Mdp invalide');
    }
    e.preventDefault();
}

// Disconnect function
function disc() {
    admin.style.display = 'none';
    disconnect.style.display = 'none';
    connect.style.display = 'inline-block';
    sessionStorage.clear();
}