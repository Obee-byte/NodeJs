var currentSize = JSON.stringify(localStorage).length;
console.log("Текущий размер localStorage:", currentSize/1024, "Kbytes");

health = parseInt(localStorage.getItem('health'))
pregnant = parseInt(localStorage.getItem('pregnancy'))
shvatki = parseInt(localStorage.getItem('shvatki'))
lust = parseInt(localStorage.getItem('lust'))
strength = parseInt(localStorage.getItem('strength'))
hunger = parseFloat(localStorage.getItem('hunger'))
currtime = parseFloat(localStorage.getItem('time'))
time_multiplier = parseFloat(localStorage.getItem('t_m'))
clothe_status = parseInt(localStorage.getItem('clothe_status'))
grabStatus = localStorage.getItem('grabStatus')
bufferUrl = localStorage.getItem('bufferUrl')
console.log("bufferUrl:", bufferUrl)
console.log('shvatki is '+shvatki);
if (shvatki <= 0) {
  alert('удалил')
  pregnant = 0
  localStorage.setItem('pregnant', 0)
}

if (pregnant==1) {
  rnum = Math.random()
  console.log(rnum+' шанс схватки');
  if (rnum>=0.9&&window.curr_loc!='birth') {
    alert('Схватка')
    bufferUrl = window.location.href;
    localStorage.setItem('bufferUrl', bufferUrl)
    shvatki--
    localStorage.setItem('shvatki', shvatki)
    window.location.replace('/story/5200')
  }
}
decay_status = localStorage.getItem('decay_status')

let stHome_event = localStorage.getItem('homeKey');
let home_e = JSON.parse(stHome_event);

resources_l = localStorage.getItem('resources')
window.resources = JSON.parse(resources_l)
console.log(grabStatus);

if (health <= 0) {
  alert('Ты вырубилась!')
  health= 15
  localStorage.setItem('health', health)
  lust= 0
  localStorage.setItem('lust', lust)
  if (grabStatus!='false') {
    window.location.replace('/story/5100')
  }
  // window.location.replace('/story/5100')
}

if (currtime > 24) {
  currtime = 0
}
if (currtime >= 9 && currtime < 18) {
  time_multiplier = 1
  localStorage.setItem('t_m', time_multiplier)
}
else {
  time_multiplier = 2
  localStorage.setItem('t_m', time_multiplier)
}


if (window.curr_loc == 'home') {
  check_eRobber(time_multiplier)
}

foods = parseInt(localStorage.getItem('foods'))
console.log("foods:", foods)

if (hunger > 100) {
  window.location.replace('/story/500');
  hunger = 0
  localStorage.setItem('hunger', 0)
}

const enemies = window.enemies;
getEnem = localStorage.getItem('enemy_name')
console.log(enemies);


if (!getEnem) {
  getEnem = 'Зомбак'
}
else {
  textElement = document.querySelector('.text')
  content = textElement.textContent
  if (content.includes('snames')) {
    while (content.includes('snames')) {
      newText = textElement.textContent.replace('snames', getEnem)
      textElement.innerHTML = newText
      content = textElement.textContent
    }
  }
}

curr_enem = enemies.find(obj => obj.name === getEnem)
max_en_lust = curr_enem ? curr_enem.lust : undefined;
max_en_health = curr_enem ? curr_enem.health : undefined;
thrust = curr_enem ? curr_enem.thrust : 0.5;
en_trust = parseFloat(thrust)

en_health = parseInt(localStorage.getItem('en_health'))
en_lust = parseInt(localStorage.getItem('en_lust'))
console.log(en_lust);

function spremeGame() {
  window.location.replace('/spreme/'+curr_enem.lust+'/4') //FIXME
}

if (lust >= 100) {
  lust = 0
  localStorage.setItem('lust', lust)
  en_lust -= 50
  localStorage.setItem('en_lust', en_lust)
  if (curr_loc == 'pussy') {
    window.location.replace('/story/5090')
  }
  else if (curr_loc == 'ass' || curr_loc == 'asscum') {
    window.location.replace('/story/5091')
  }
  else if (curr_loc == 'mouth') {
    window.location.replace('/story/5092')
  }
  else{alert('Запорол lust, возможно с curr loc')}
}

if (en_health >= parseInt(max_en_health)) {
  localStorage.setItem('en_health', 0)
  localStorage.setItem('en_lust', 0)
  window.location.replace('/story/5050')
}

if (en_lust >= parseInt(max_en_lust)) {
  localStorage.setItem('en_health', 0)
  localStorage.setItem('en_lust', 0)
  if (window.curr_loc == 'pussy') {
    window.location.replace('/story/5051')
  }
  else if (window.curr_loc == 'ass' || window.curr_loc == 'asscum') {
    window.location.replace('/story/5052')
  }
  else if (window.curr_loc == 'mouth') {
    window.location.replace('/story/5053')
  } 
  else{alert('Запорол конч врага, возможно с curr loc')}
}

if(grabStatus!='false' && strength <= 0) {
  alert('Ты не смогла устоять!')
  grabStatus = 'false'
  strength = 15
  localStorage.setItem('strength', strength)
  localStorage.setItem('grabStatus', grabStatus)
  window.location.replace('/story/400')
}
if(window.curr_loc==='mouth') {
  rnum = Math.random()
  if (rnum <= 0.4) {
    window.location.replace('/story/5065')
  }
}
if (window.curr_loc=='ass') {
  rnum = Math.random()
  if (rnum <= 0.3) {
    window.location.replace('/story/5068')
  }
}

function attack(value){
  en_health += value
  localStorage.setItem('en_health', en_health)
}

function satisfy(value) {
  en_lust += value
  localStorage.setItem('en_lust', en_lust)
}

function thrustS() {
  if (window.curr_loc == 'ass') {
    health -= en_trust
    lust += (en_trust*10)
    localStorage.setItem('health', health)
    localStorage.setItem('lust', lust)
  }
  else if (window.curr_loc == 'pussy') {
    lust += (en_trust*7)
    localStorage.setItem('lust', lust)
  }
}

console.log('lust is ' +lust);

function incrStrength(value) {
  strength += value
  localStorage.setItem('strength', strength)
}

function decay(value) {
  decay_status += value
  localStorage.setItem('decay_status', decay_status)
}

function tryy(param, anys, href) {
  val = parseInt(href)
  params = parseFloat(param)
  random = Math.random()
  if (params >= random) {
    anys()
    alert("Тебя услышали!")
    window.location.replace('/story/'+val)
  }
  else {}
}

function choosePose() {
  num = Math.random()
  setTimeout(()=>{
  if (clothe_status == 3 || num<=0.3) {
    window.location.replace('/story/5060')
  }
  else if (num >= 0.65) {
    window.location.replace('/story/5070')
  }
  else {
    window.location.replace('/story/5080')
  }
}, 400)
}
function increaseHunger(value) {
  hunger+=value
  localStorage.setItem('hunger',hunger)
}

function shvatkiplus(){
  shvatki++;
  localStorage.setItem('shvatki', shvatki)
}

function eat(value) {
  hunger -= value
  localStorage.setItem('hunger', hunger)
  
}

function satiate(value) {
    if (hunger < 0) {
      hunger = 0
    }
    if (hunger >= 0 && foods >= value) {
      foods -= value
      hunger -= value
      if (hunger < 0) {
        hunger = 0
      }
      localStorage.setItem('foods', foods)
      localStorage.setItem('hunger', hunger)
    }
    else if (hunger == 0) {
      alert('Ты уже сыт!')
      setTimeout(() => {
        window.location.replace('/story/50')
        }, 0);
    }
    else if (foods <= value && foods > 0 && hunger != 0) {
      foods = 0
      hunger -= 5
      alert('Ты собрала все свои припасы и с жадностью съела')
      localStorage.setItem('hunger', hunger)
      localStorage.setItem('foods', foods)
      setTimeout(() => {
      window.location.replace('/story/50')
      }, 0);
    }
    else if (foods == 0) {
      alert('у тебя нет еды!')
      setTimeout(() => {
        window.location.replace('/story/50')
        }, 0);
    }
    else {window.location.href = event.target.href}
  
}

function decreaseHP(value) {
    health -= value
    localStorage.setItem('health', health)
}

function increaseL(value) {
    lust += value
    localStorage.setItem('lust', lust)
}

function healHP(value) {
  if (health <= 100) {
    health += value
    localStorage.setItem('health', health)
  }
  else {hunger -= value;localStorage.setItem('hunger', hunger)}
}

function urli() {
  window.location.replace(bufferUrl)
}

function refreshData() {
    localStorage.setItem('buffer-clothe', 3)
    localStorage.setItem('health', '100')
    localStorage.setItem('pregnancy', 0)//Change!
    localStorage.setItem('shvatki', 5)
    localStorage.setItem('lust', '0')
    localStorage.setItem('strength', '100')
    localStorage.setItem('hunger', 0)
    localStorage.setItem('foods', 0)
    localStorage.setItem('clothe_status', 3)
    localStorage.setItem('grabStatus', false)
    localStorage.setItem('en_lust', 0)
    localStorage.setItem('decay_status', 0)
    localStorage.setItem('en_health', 0)
    localStorage.setItem('bufferUrl', '1')
    home = {'door_event': true, 'window_event': true}
    places = [
      { type: 'supermarket', capacity: 1400, items: ['scotch', 'vine', 'apples'] },
      { type: 'b-market', capacity: 200, items: [] },
      { type: 'b-sklad', capacity: 0, items: ['koleso'] },
      { type: 'store', capacity: 700, items: ['scotch', 'cherry'] },
      { type: 'trash', capacity: 2500, items: ['scotch', 'wood1', 'bolts1'] }
    ]
    resources = []
    localStorage.setItem('places', JSON.stringify(places));
    localStorage.setItem('homeKey', JSON.stringify(home))
    localStorage.setItem('resources', JSON.stringify(window.resources))
    localStorage.setItem('clothe_set', 'pink')
    localStorage.setItem('time', 9)
    localStorage.setItem('t_m', 0)
    localStorage.removeItem('enemy_name')
    fetch('/r')
      .then(response => {
        if (response.ok) {
          console.log('Data successfully refreshed');
          
        } else {
          console.error('Error refreshing data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      // window.location.replace('/story/1')
  }
function time_go(value) {
  new Promise (resolve =>{
    if (decay_status > 0 && decay_status >= value) {
      health -= value
      hunger += (value*2)
      decay_status -= value
      localStorage.setItem('health', health)
      localStorage.setItem('hunger', hunger)
      localStorage.setItem('decay_status', decay_status)
    }
    else if (decay_status > 0 && decay_status < value){
      health -= decay_status
      decay_status = 0 
      localStorage.setItem('health', health)
      localStorage.setItem('decay_status', decay_status)
    }
    currtime += (value/60)
    hunger += (0+(value/28))
    if (strength <100) {
      strength += (0+(value/12))
    }
    if (lust>0) {
      lust -= (0+(value/28))
    }
    localStorage.setItem('hunger', hunger)
    localStorage.setItem('strength', strength)
    localStorage.setItem('lust', lust)    
    localStorage.setItem('time', currtime)
    resolve(true)
  })
  
}

function decreaseFood(value) {
  foods -= value
  localStorage.setItem('foods', foods)
}

function minusStrength(value) {
  strength -=value
  localStorage.setItem('strength', strength)
}

function wear(value) {
  if (localStorage.getItem('clothe_set') == value) {
    alert('Ты уже надела это!')
  } else {
    localStorage.setItem('clothe_set', value)
    window.location.replace('/story/58')
  }
}

function strip() {
  localStorage.setItem('buffer-clothe', clothe_status)
  clothe_status = 0
  localStorage.setItem('clothe_status', clothe_status)
}

function getpregnant() {
  alert('work')
  shvatki=3
  pregnant = 1
  localStorage.setItem('pregnancy', 1)
  localStorage.setItem('shvatki', shvatki)
  
}

function wearBuf() {
  bufferClothe = localStorage.getItem('buffer-clothe')
  localStorage.setItem('clothe_status', bufferClothe)
}

function grab_finded() {
  return new Promise (resolve => {
    num = Math.random()
    grabbed = false
    if (num <= 0.1) {
      grabbed = true
    }
    if (grabbed) {
      setTimeout(() => {
      window.location.replace('/story/150')
      resolve(false)}, 0)
    }
    resolve(true)
  })
}



var storedPlaces = localStorage.getItem('places');
var places = storedPlaces ? JSON.parse(storedPlaces) : [];
// console.log(places);

function try_find(place, v_item, random, link) {
  randomNum = Math.random();
  return new Promise(resolve => {
  let foundItem = true;
  if (parseFloat(random) >= randomNum) {
    for (let i = 0; i < places.length; i++) {
      if (places[i].type === place && places[i].items.includes(v_item) == true) {
        places[i].items = places[i].items.filter(item => item !== v_item)
        localStorage.setItem('places', JSON.stringify(places));
        window.resources.push(v_item)
        localStorage.setItem('resources', JSON.stringify(window.resources)); 
        window.location.replace('/story/' + link)
        foundItem = false;
        }
      else if (places[i].type === place && v_item == 'food') {
        alert('Еда!')
        places[i].capacity -= 17
        localStorage.setItem('places', JSON.stringify(places));
        foods += 17
        localStorage.setItem('foods', foods)
        window.location.replace('/story/' + (parseInt(link)+2))
        foundItem = false;
      }
        }
        if (!foundItem) {
          setTimeout(() => {
            window.location.href = "/story/"+link
            resolve(false); // Предотвращение перехода по ссылке a
          }, 0);
        } else {
          resolve(true); // Разрешение перехода по ссылке /2
        }
      }
})

}

function e_encountZ(value) {
    let foundEnemy = true; // Флаг, указывающий, был ли найден враг

    enemies.forEach(el => {
      if (!foundEnemy) {
        return; // Если уже найден враг, прекратить перебор
      }
      randomNum = Math.random();
      if (parseFloat(el.random*(parseFloat(value))) > randomNum) {
        foundEnemy = false;
        localStorage.setItem('enemy_name', el.name)
      }
    });
    if (!foundEnemy) {
      setTimeout(() => {
        bufferUrl = window.location.href;
        localStorage.setItem('bufferUrl', bufferUrl)
        window.location.replace('/story/5001')
      }, 0);
    } else {
    }
  }
// Разработай систему динамического изменения картинки гардероба
// Начни сюжет с Авазы
// добавь особые предметы и достижения
// TODO продумай логику захватов и плохих событий

window.resources = []
window.stringsToCheck = ["koleso", "rama", "seat", "koleso2", "cepocka", "pedal"]
function repair_d() {
  allHave = true
  return new Promise(resolve => {
  
  if (
    window.stringsToCheck.every(function(string) {return window.resources.includes(string);})) {
      allHave = false
    }
  if (!allHave) {
    setTimeout(() => {
    home_e.door_event = false
    localStorage.setItem('homeKey', JSON.stringify(home_e));
    window.location.href ='/story/55'
    resolve(false)}, 0)
  }
  else {
    alert("Не хватает ресурсов")
    resolve(true)
  }
})}

if (window.curr_loc == 'streets') {
  e_encountZ(this, time_multiplier)
}

function check_eRobber(value) {
  randomNum = Math.random()
  door = parseFloat(0.07*value)
  window = parseFloat(0.14*value)
  if (home_e.door_event && randomNum <= door) {
    setTimeout(() => {
      alert('Вошли через дверь!')
      window.location.replace('/story/510');
    }, 500);
  }
  else if(home_e.window_event && randomNum >= door && randomNum <= window) {
    setTimeout(() => {
      alert('Вошли через окно!')
      window.location.replace('/story/530');
  }, 500);}
}

function clothe_remove() {
  setGrab(true)
  if (clothe_status > 2) {
    clothe_status -= 2
    localStorage.setItem('clothe_status', clothe_status)
  }
  else if (clothe_status != 0){
    clothe_status -= 1
    localStorage.setItem('clothe_status', clothe_status)
  }
  else {
    decreaseHP(10)
  }
  decreaseHP(5)
  }
  
function setGrab(bool) {
  if(bool == 'true') {
    grabStatus = 'true'
    localStorage.setItem('grabStatus', 'true')
  }
  else{grabStatus = 'false';localStorage.setItem('grabStatus', 'false')}
}


document.querySelectorAll('a').forEach(link => {
link.addEventListener('click', event => {
  event.preventDefault();
  mask.classList.remove('hide')
  mask.classList.remove('anim_out')
  // Задержка в 500 мс
  setTimeout(() => {
    
    window.location.href = link.getAttribute('href');
  }, 500);
});
});