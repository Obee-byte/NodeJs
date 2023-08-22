health = parseInt(localStorage.getItem('health'))
lust = parseInt(localStorage.getItem('lust'))
hunger = parseInt(localStorage.getItem('hunger'))
foods = parseInt(localStorage.getItem('foods'))

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

  function e_encountZ(event) {

    return new Promise(resolve => {
      randomNum = Math.random();
      let foundEnemy = true; // Флаг, указывающий, был ли найден враг

      enemies.forEach(el => {
        console.log('el.random is ' + el.random);
        if (parseFloat(el.random) > randomNum) {
          foundEnemy = false;
          localStorage.setItem('enemy_name', el.name)         
        }
      });
      if (!foundEnemy) {
        event.preventDefault(); // Предотвращение навигации по ссылке
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