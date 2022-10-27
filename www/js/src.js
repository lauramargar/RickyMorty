'use strict';

async function data(query) { 
    const response = await fetch('https://rickandmortyapi.com/api/character', {})
    const data = await response.json();
    const results = data.results.filter(character => character.name.includes(query))
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

async function search_character(){
    reset();
    let input = document.getElementById('mySearch').value;
    const char = await data(input);
    print(char);
    console.log(char);
}

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
        document.getElementById('main').append(section);
    }
}

function reset(){
    const elements = document.getElementsByClassName('section');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}