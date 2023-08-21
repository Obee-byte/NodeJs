health = parseInt(localStorage.getItem('health'))
lust = parseInt(localStorage.getItem('lust'))
const enemies = window.enemies;
getEnem = localStorage.getItem('enemy_name')

if (!getEnem) {
}
else {
  textElement = document.querySelector('.text')
  newText = textElement.textContent.replace('snames', getEnem)
  textElement.textContent = newText
}

//Добавить описание в скобочках (успешная вероятность: 50%)

console.log('Current HP is ' + health);
console.log('Current L: ' + lust );

function decreaseHP(value) {
    health -= value
    localStorage.setItem('health', health)
    console.log('Decreased HP: ' + health );
}

function increaseL(value) {
    lust += value
    localStorage.setItem('lust', lust)
    console.log('Increased L: ' + lust );
}

function healHP(value) {
    health += value
    localStorage.setItem('health', health)
    console.log('Increased HP: ' + health );
}

function refreshData() {
    localStorage.setItem('health', '100')
    localStorage.setItem('lust', '0')
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
        setTimeout(() => {
          window.location.href = "/story/101";
          resolve(false); // Предотвращение перехода по ссылке /2
        }, 0);
      } else {
        resolve(true); // Разрешение перехода по ссылке /2
      }
    });
  }