/* var currentSize = JSON.stringify(localStorage).length;
console.log("Текущий размер localStorage:", currentSize, "bytes");
 */
health = parseInt(localStorage.getItem('health'))
lust = parseInt(localStorage.getItem('lust'))
hunger = parseInt(localStorage.getItem('hunger'))
currtime = parseFloat(localStorage.getItem('time'))
time_multiplier = parseFloat(localStorage.getItem('t_m'))
console.log("currtime:", currtime)

let stHome_event = localStorage.getItem('homeKey');
let home_e = JSON.parse(stHome_event);

console.log("window.location:", window.curr_loc)

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

if (hunger > 500) {
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

console.log('Current HP is ' + health);
console.log('Current L: ' + lust );

function satiate(value) {
  if (hunger <= 0) {
    hunger -= value
    localStorage.setItem('hunger', hunger)
  }
  else {
    alert('Ты уже сыт!')
  }
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
    health += value
    localStorage.setItem('health', health)
}

function refreshData() {
    localStorage.setItem('health', '100')
    localStorage.setItem('lust', '0')
    localStorage.setItem('hunger', 0)
    localStorage.setItem('foods', 0)
    home = {'door_event': true, 'window_event': true}
    localStorage.setItem('homeKey', JSON.stringify(home))
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
  currtime += (value/60)
  const links = document.querySelectorAll('a')
  links.forEach(function(link) {
    link.addEventListener('click', function(){ handleClick(event, value)});
  });
  localStorage.setItem('time', currtime)
}


function e_encountZ(event, value) {

  return new Promise(resolve => {
    randomNum = Math.random();
    let foundEnemy = true; // Флаг, указывающий, был ли найден враг

    enemies.forEach(el => {
      console.log(el.random*value);
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

if (window.curr_loc == 'streets') {
  e_encountZ(this, time_multiplier)
}


function handleClick(event, value) {
  hunger += (0+value)
  localStorage.setItem('hunger', hunger)
}

function check_eRobber(event) {
  randomNum = Math.random()
  console.log("check_eRobber  randomNum:", randomNum)
  if (home_e.door_event && randomNum <= 0.1) {
    alert('Вошли через дверь!')
    window.location.replace('/story/510');
  }
  else if(home_e.window_event && randomNum >= 0.9) {
    alert('Вошли через окно!')
    window.location.replace('/story/530');
  }
}