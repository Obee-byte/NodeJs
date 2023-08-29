var currentSize = JSON.stringify(localStorage).length;
console.log("Текущий размер localStorage:", currentSize/1024, "Kbytes");

health = parseInt(localStorage.getItem('health'))
lust = parseInt(localStorage.getItem('lust'))
hunger = parseFloat(localStorage.getItem('hunger'))
console.log("hunger:", hunger)
currtime = parseFloat(localStorage.getItem('time'))
time_multiplier = parseFloat(localStorage.getItem('t_m'))
console.log("currtime:", currtime)

let stHome_event = localStorage.getItem('homeKey');
let home_e = JSON.parse(stHome_event);

resources_l = localStorage.getItem('resources')
window.resources = JSON.parse(resources_l)

if (currtime >= 9 && currtime < 18) {
  time_multiplier = 1
  localStorage.setItem('t_m', time_multiplier)
}
else {
  time_multiplier = 2
  localStorage.setItem('t_m', time_multiplier)
}

if (window.curr_loc == 'home') {
  check_eRobber()
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

if (!getEnem) {
}
else {
  textElement = document.querySelector('.text')
  newText = textElement.textContent.replace('snames', getEnem)
  textElement.textContent = newText
}
function satiate(event, value) {
  event.preventDefault()
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
      window.location.href = event.target.href
    }
    else if (hunger <= 100) {
      alert('Ты уже сыт!')
    }
    else if (foods <= value && foods >= 0 && hunger != 0) {
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

function refreshData() {
    localStorage.setItem('health', '100')
    localStorage.setItem('lust', '0')
    localStorage.setItem('hunger', 0)
    localStorage.setItem('foods', 0)
    home = {'door_event': true, 'window_event': true}
    places = [
      { type: 'supermarket', capacity: 1400, items: ['scotch', 'vine', 'apples'] },
      { type: 'store', capacity: 700, items: ['scotch', 'cherry'] },
      { type: 'trash', capacity: 2500, items: ['scotch', 'wood1', 'bolts1'] }
    ]
    resources = []
    localStorage.setItem('places', JSON.stringify(places));
    localStorage.setItem('homeKey', JSON.stringify(home))
    localStorage.setItem('resources', JSON.stringify(window.resources))
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
  }
function time_go(value) {
  new Promise (resolve =>{
    currtime += (value/60)
    hunger += (0+(value/28))
    localStorage.setItem('hunger', hunger)
    localStorage.setItem('time', currtime)
    resolve(true)
  })
  
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

function e_encountZ(event, value) {

  return new Promise(resolve => {
    randomNum = Math.random();
    let foundEnemy = true; // Флаг, указывающий, был ли найден враг

    enemies.forEach(el => {
      if (parseFloat(el.random*value) > randomNum) {
        foundEnemy = false;
        localStorage.setItem('enemy_name', el.name)         
      }
    });
    if (!foundEnemy) {
      setTimeout(() => {
        alert('I must work!!')
        window.location.href = "/story/101";
        resolve(false); // Предотвращение перехода по ссылке /2
      }, 0);
    } else {
      resolve(true); // Разрешение перехода по ссылке /2
    }
  });
}
// TODO добей foods и hunger  
// TODO продумай логику захватов и плохих событий

window.resources = []
window.stringsToCheck = ["scotch", "wood1", "hammer", "wood2", "bolts1", "bolts2"]
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