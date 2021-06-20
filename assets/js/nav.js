import { getAllTeam, getStandingsIng, getStandingsJer, getStandingsPrc, getStandingsSpn,getStandingsChmps removePrelaod } from './api.js';
import {showSavTeam} from './show'

// Activate sidebar nav
var elems = document.querySelectorAll('.sidenav');
M.Sidenav.init(elems);


//load page content
let page = window.location.hash.substr(1);
let idtim2 = Number(window.location.hash.substr(6));
let idteam3 = Number(window.location.hash.substr(9))


if (page === '') {
  page = 'dashboard';
} 
else if ( page === "bundesliga" || page === "ligue1" || page === "premier" || page === "primera" || page === "uefa" ||
idteam3 ){
  page = "team"
}



loadPage(page);
function loadPage(page) {
  removePrelaod()  
  loadNav();
console.log(page)
 

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var content = document.querySelector('#body-content');
      if (this.status == 200) {
        
        idtim2 = Number(window.location.hash.substr(6));
        page = window.location.hash.substr(1);
        idteam3 = Number(window.location.hash.substr(9))

        content.innerHTML = xhttp.responseText;
        if(page === "bundesliga") {
          getStandingsJer()
        } else if ( page === "ligue1"){
          getStandingsPrc()
        } else if (page === "primera") {
          getStandingsSpn()
        } else if ( page === "premier"){
          getStandingsIng()
        } else if ( page === "uefa"){
          getStandingsChmps()
        } else if ( idteam3 ){
          getAllTeam(idteam3)
        } else if (page === 'saved') {
          showSavTeam();
        }
        document.querySelectorAll(".linked").forEach((link) => {
          link.addEventListener('click', () => {
            loadPage("team")
            })
        })


      } else if (this.status == 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
      } else {
        content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
      }
    }
  };
  xhttp.open('GET', 'pages/' + page + '.html', true);
  xhttp.send();
}

function loadNav() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status != 200) return;

      // Muat daftar tautan menu
      document.querySelectorAll('.topnav, .sidenav').forEach(function (elm) {
        elm.innerHTML = xhttp.responseText;
      });

      // Daftarkan event listener untuk setiap tautan menu
      document
        .querySelectorAll('.sidenav a, .topnav a')
        .forEach(function (elm) {
          elm.addEventListener('click', () => {
            // Tutup sidenav
            var sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            let pageL = elm.getAttribute('href').substr(1);
            console.log(pageL);
            loadPage(pageL);
          });
        });
    }
  };
  xhttp.open('GET', 'nav.html', true);
  xhttp.send();
}

export {loadPage};
