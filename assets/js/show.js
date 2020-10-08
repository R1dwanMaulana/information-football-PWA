// fungsi untuk menampilkan list team dan standing
import { loadPage } from "./nav"
import { isSav, deleteTeamSav, addTeamSav, getAllTeamSav } from "./db"

function showStandingsAll(teamx){
  const teamElement = document.querySelector("#teamx")
  let dataTim = ""
  const competitions = teamx.competition
  const season = teamx.season
  let header = `
  <div class="card headerx bulatx z-depth-3">
	  <div class="bg-clr bulatx standings">
        <a class="cmp-name"><h4>${competitions.name}</h4></a><br>
          <table>
            <td><a class="putih">awal(${season.startDate}) - berakhir(${season.endDate})</a></td> 
            <td class="rata-kanan">${competitions.area.name}</td>
          </table>
    </div>
  </div>
  `
  teamx.standings[0].table.forEach(tim => {
    
    dataTim += `
          <tr>
            <td><img src="${tim.team.crestUrl.replace(/^http:\/\//i,'https://')}" width="30px" alt="badge"/>
            <a class="linked" href="#team?id=${tim.team.id}">${tim.team.name}</a></td>  
            <td>${tim.won}<sub><a class="hijau">win</a></sub></td>
            <td>${tim.draw}<sub><a class="abu2">draw</a></sub></td>
            <td>${tim.lost}<sub><a class="merah">lose</a></sub></td>
            <td><strong> ${tim.points}</strong></td>
            <td><strong>${tim.position}</strong></td>
          </tr>
    `
  })
  teamElement.innerHTML = `
    ${header}
    <div class="rounded card z-depth-3">
      <table>
      
        <tr>
            <th>Club</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Lose</th>
            <th>pt</th>
            <th>ps</th>
        </tr>
      
      ${dataTim}

      </table>
    </div>
`
document.querySelectorAll(".linked").forEach(link => {
  link.addEventListener('click', () => {
    loadPage("team")
    })
})

document.querySelectorAll('img').forEach((img) => {
  img.onerror = function() {
    this.setAttribute("src", "/assets/img/default.png")
  }
});
}


// untuk menampilkan detail team
function showTeam(team){
  const teamx = document.getElementById('teamx');

  let dataPemain = '';
  team.squad.forEach((pemainx) => {
    dataPemain += `
    <tr>
       <td>${pemainx.name === null ? 'tidak diketahui' : pemainx.name}</td>
       <td>${pemainx.position === null ? 'tidak diketahui' : pemainx.position}</td>
       <td>${pemainx.nationality === null ? 'tidak diketahui' : pemainx.nationality}</td>
       <td>${pemainx.role === null ? 'tidak diketahui' : pemainx.role}</td>
    </tr>
    `
  })
 
  
  // menampilkan info team
  teamx.innerHTML = `
  <div class="card headerx bulatx">
	<div class="info bulatx">
        <center><a class="putih">Informasi Tim</a></center>
        </div>
    </div>

  <div class="card detail z-depth-3">
    <div class="row">
      <div class="col m5 l6 s12">
        <div class="card-image">
          <img class="logo" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
        </div>
      </div>
      <div class="col m7 l6 s12">
          <div class="card-content">
            <h5 class="badge bulx z-depth-3">${team.name} (${team.shortName})</h5>
            <p>${team.name} (${team.shortName}) didirikan pada tahun <strong>
            ${team.founded === null ? 'yang tidak diketahui' : team.founded}
            </strong> yang beralamat di ${team.address}. Dan memiliki warna khas ${team.clubColors}.</p>
            <br/>
            <b>Phone</b>: ${team.phone} <br/> <b>Email</b>: ${team.email} <br/> <b>Website</b>: ${team.website}
          </div>
      </div>
        
    </div>
    <a class="btn-floating halfway-fab waves-effect waves-light deep-orange pulse" id="simpan" href=${
      team.id
    } ><i class="material-icons" id="ikonx">save</i></a>
    
	</div>


  <div class="rounded card z-depth-3">
  
    <table>
      <tr>
        <th>Pemain</th>
        <th>Posisi</th>
        <th>Kebangsaan</th>
        <th>Role</th>
      </tr>

      ${dataPemain}
      
    </table>
  
  </div>
  `;

      // mengecek id team apa sudah ada di DB
      // jika ya, maka tombol save akan berubah
      async function dataxx() {
        if (await isSav(parseInt(window.location.hash.substr(9)))) {
          ikonx.innerHTML = 'delete';
        }
      }
      dataxx();

      document.getElementById('simpan').addEventListener('click', async (e) => {
  		e.preventDefault();
  		// mendapatkan id team dari nilai href
  		const teamId = parseInt(e.currentTarget.getAttribute('href'));
  
  		if (await isSav(teamId)) {
          deleteTeamSav(teamId);
          ikonx.innerHTML = 'save';
          M.toast({ html: `${team.name} Team telah dihapus` });
        } else {
          M.toast({ html: `${team.name} Team telah disimpan` });
          ikonx.innerHTML = 'delete';
          addTeamSav(team);
        }
      });

      document.querySelectorAll('img').forEach((img) => {
        img.onerror = function() {
          this.setAttribute("src", "/assets/img/default.png")
        }
      });
}

//fungsi untuk menampilkan team saved
function showSavTeam() {
  getAllTeamSav().then((savs) => {
    let data = '';
    let data2 = '';
    // looping data dari database
    savs.forEach((savs) => {
      data2 += `
      <tr> 
        <td>
          <img src="${savs.crestUrl.replace(/^http:\/\//i,'https://')}" width="40px" alt="badge"/>
        </td>
        <td>
          <a class="simpanan" href="#team?id=${savs.id}">${savs.name}</a></td>
      </tr> `;
		});
      data += `
        <div class="z-depth-4 card saved standings home"> 
          <table class="striped"> 
          ${data2 === '' ? '<td><a>Tidak Ada Team yang disimpan</td></a>' : data2} 
          </table> 
        </div>`;
      
      document.getElementById('teamSaved').innerHTML = data;
        document.querySelectorAll('.simpanan').forEach(function (lnk) {
          lnk.addEventListener('click', function (event) {
            // mengambil nilai id lalu dimasukkan ke variabel urlTeam Param
            // Muat konten halaman yang dipanggil
            loadPage("team");
          });
        });
        document.querySelectorAll('img').forEach((img) => {
          img.onerror = function() {
            this.setAttribute("src", "/assets/img/default.png")
          }
        });
  });

  
}


export {showStandingsAll, showTeam, showSavTeam}

