'use strict';

/*async function data(query) { 
    const response = await fetch('https://rickandmortyapi.com/api/character', {})
    const data = await response.json();
    const results = data.results.filter(character => character.name.includes(query))
    return results;
}*/

let pag = 1;
async function nextPag(num){
    reset();
    pag = num;
    findByPage(num).then(all=>{
        print(all.results);
    });
}

async function findByPage(query) {
    let statusFilter = document.getElementById('status-select').value;
    let speciesFilter = document.getElementById('species-select').value;
    console.log(statusFilter);

    if(statusFilter === ''||speciesFilter === '') {
        let name = document.getElementById('mySearch').value;
        if(name === null){
            name = ' ';
        }
        console.log(statusFilter);
        const response = await fetch('https://rickandmortyapi.com/api/character/?page='+query+'&name='+name, {});
        const data = await response.json();
        return data;
    } else {
        console.log('hola');
        console.log(statusFilter);
        filterBy();
    }
    
}

let types = new Array();
let valores = new Array();
//let filtro = new Boolean(false);

async function filterBy(){
    //filtro = true;
    let statusFilter = document.getElementById('status-select');
    let speciesFilter = document.getElementById('species-select');
    let name = document.getElementById('mySearch').value;
    if (name === null){
        name = ' ';
    }
    if (!speciesFilter.value==''){
        types[0] = 'species';
        valores[0] = speciesFilter.value;
        if(!statusFilter.value==''){
            types[1] = 'status';
            valores[1] = statusFilter.value;
            reset();
            charactersByFilter2Filter(types,valores,name,pag).then(all=>{
                console.log(all);
                print(all.results);
            });
        } else {
            reset();
            charactersByFilter(types[0],valores[0],name,pag).then(all=>{
                print(all.results);
            });
        }
    } else if (!statusFilter.value==''){
        types[0] = 'status';
        valores[0] = statusFilter.value;
        reset();
        charactersByFilter(types[0],valores[0],name,pag).then(all=>{
            print(all.results);
        });
    }
    
}

async function charactersByFilter(type,filter,name) {
    const response = await fetch('https://rickandmortyapi.com/api/character/?page='+pag+'&name='+name+'&'+type+'='+filter, {});
    const results = await response.json();
    return results;
}

async function charactersByFilter2Filter(types,valores,name) {
    const response = await fetch('https://rickandmortyapi.com/api/character/?page='+pag+'&name='+name+'&'+types[0]+'='+valores[0]+'&'
        +types[1]+'='+valores[1]);
    const results = await response.json();
    return results;
  }

async function get_all() { 
    const response = await fetch('https://rickandmortyapi.com/api/character', {})
    const data = await response.json();
    return data;
}

get_all().then(allCharacteres=>{
    console.log(allCharacteres);
    document.querySelector('article').innerHTML='';
    const char=allCharacteres.results;
    print(char);
  });

/*async function search_character(){
    reset();
    let input = document.getElementById('mySearch').value;
    const char = await data(input);
    print(char);
    console.log(char);
}*/

function print(char){
    for(let i=0; i<=char.length;i++){
        let section = document.createElement('section');
        let divstatus = document.createElement('div');
        let divname = document.createElement('div');
        let divimg = document.createElement('div');
        let divspecies = document.createElement('div');
        let divorigin = document.createElement('div');

        section.className='section';

        let imagen = document.createElement('img');
        imagen.src=char[i].image;
        divimg.appendChild(imagen);
        divimg.className='img';

        divname.textContent=char[i].name;
        divname.className='name';

        divstatus.textContent=char[i].status;
        divstatus.className='status';

        divspecies.textContent=char[i].species;
        divspecies.className='species';

        divorigin.textContent=char[i].origin.name;
        divorigin.className='origin';

        section.append(divimg);
        section.append(divname);
        section.append(divstatus);
        section.append(divspecies);
        section.append(divorigin);
        document.getElementById('results').append(section);
    }
}

function reset(){
    //filtro = false;
    const elements = document.getElementsByClassName('section');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}