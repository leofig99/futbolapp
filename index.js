//https://www.thesportsdb.com/api.php
let equipos = [];
let orden = false;
const modal = document.querySelector("#modal");
const equipoName = document.querySelector("#equipo-name");
const equipoDesc = document.querySelector("#equipo-descripcion");
const equipoPais = document.querySelector("#equipo-pais");
const rImage = document.querySelector("#equipo-image");
const inputbuscarjugador = document.querySelector(".buscarjugador");
let idequipo = 0;
let buscar = (name) =>{
  fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${name}`)
  .then((response) => response.json())
  .then((data) => {
    equipos = data.teams;
   // console.log(equipos.filter(x=> x.idLeague = id));
    render(equipos);
  });
}


  //principales ligas
  //4350 liga mex
  //4328 premier
  //4332 serie a
  //4334 francesa
  //4335 españa


  let render = (equipos) => {
    console.log(equipos);
    document.querySelector("#results").innerHTML = "";
  
    for (let i in equipos) {
      let col = document.createElement("div");
      col.classList.add("column", "is-2-desktop", "is-1-tablet");
  
      let card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", equipos[i].idTeam);
  
      card.innerHTML = `<div class="card-image" >
                  <figure class="image is-1by1 mt-5">
                      <img src="${equipos[i].strTeamBadge}" alt="Placeholder image">
                  </figure>
              </div>
              <div class="card-content">
                  <div class="is-flex is-justify-content-space-between is-align-items-center">
                      <div class="content mb-0">
                          <p class="has-text-weight-semibold mb-0 is-size-4 is-uppercase is-size-4 is-uppercase"></p>
                          <p class="mb-0 is-size-6"><strong>${equipos[i].strTeam}</strong></p>
                      </div>
                  </div>
              </div>
              `;
  
      card.addEventListener("click", () =>
        mostrarModal(card.dataset.id)
      );
      
      col.append(card);
      document.querySelector("#results").append(col);
    }
  };
  

  const llenarModal = (equipo) => {
    
      const { strTeam, strDescriptionES, strCountry , strTeamBadge, strDescriptionEN, idTeam  } = equipo;
    
      equipoName.innerText = strTeam;
      if(strDescriptionES==null){
        equipoDesc.innerText = strDescriptionEN;
      }else{
        equipoDesc.innerText = strDescriptionES;
      }
      
      equipoPais.innerText = strCountry;
      inputbuscarjugador.innerHTML =`<input type="text" id="${idTeam}" class="input inputtext" />`;
      rImage.setAttribute('src', strTeamBadge)
    };
    
    const mostrarModal = (id) => {
      equipoName.innerText = "";
      equipoDesc.innerText = "";
      equipoPais.innerText = "";
        idequipo = id;
      modal.classList.toggle("is-active");
      if (id !== undefined) {
        llenarModal(equipos.find(x=> x.idTeam == id));
      }
    };

    let buscartexto = (evt) => {
      evt.preventDefault();
      let name = document.querySelector("#inputBusqueda").value.toLowerCase();
      let filtrados = equipos.filter((equipos) => {
        return equipos.strTeam.toLowerCase().includes(name);
      });
      render(filtrados);
    };

    document.querySelector("#inputBusqueda").addEventListener("keyup", buscartexto);

    document.querySelector("#ordenar").addEventListener("click",()=>{
        if(orden){
          orden= false;
          equipos.sort(function(a,b){
          return a.strTeam > b.strTeam ? 1 : -1;
          });
        }else{
          orden = true;
          equipos.sort(function(a,b){
          return a.strTeam > b.strTeam ? -1 : 1;
          });
        }
        
      render(equipos);
    });

    document.querySelector(".buscarjugador").addEventListener("keydown",function(e){
      if(e.which==13){
        let nombre = document.querySelector("[id='"+idequipo+"']").value;
        
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${nombre}`)
        .then((response) => response.json())
        .then((data) => {
          
            let jugadores = data.player;
            console.log(jugadores);
            if(jugadores!=null && jugadores!=undefined){
            let jugador = jugadores.find(x=> x.idTeam == idequipo);
            console.log(jugador);
            if(jugador!=undefined){
              alert(jugador.strPlayer);
            }else{
              alert("No se encontro jugador");
            }
            }else{
              alert("No se encontro jugador");
            }
            
          
        });
      }
      
    });