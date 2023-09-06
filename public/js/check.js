setTimeout(() => {
  mask = document.querySelector('.mask')
  time_div = document.querySelector('.time')
  inform = document.querySelector('.inform')
  menu = document.querySelector('.girl-menu')
  inform.addEventListener('click', toggleMenu);
  g_slider = document.querySelector('.g-slider')
  sl_right = document.querySelector('.sl_right')
  sl_left = document.querySelector('.sl_left')
  clothe_status = parseInt(localStorage.getItem('clothe_status'))
  clothe_display = document.querySelector('.clothe_d')
  strength_stat = document.querySelector('.strength')
  slider_first_el = document.querySelector('.slider_first_el')
  slider_second_el = document.querySelector('.slider_second_el')
  slider_third_el = document.querySelector('.slider_third_el')
  decay_display = document.querySelector('.decay')
  soaks = document.querySelector('.soaks')
  belly = document.querySelector('.belly')
  pregnant = parseInt(localStorage.getItem('pregnancy'))
  lust = parseInt(localStorage.getItem('lust'))
  
  const progressBar = document.querySelector('.progress-bar');
  
  pregn = document.querySelector('.pregn')
  f_img = document.querySelector('.f_img')
  s_img = document.querySelector('.s_img')
  t_img = document.querySelector('.t_img')
  decay_status = parseInt(localStorage.getItem('decay_status'))
  console.log("setTimeout  decay_status:", decay_status)
  dec_stat = document.querySelector('.dec_stat')
  dec_disp_1 = document.querySelector('.decay-')
  let isAct = false;
  let isSlideShown = false
  let curr_slide = 1

  var hours = Math.floor(parseFloat(localStorage.getItem('time')));
  var minutes = Math.round((parseFloat(localStorage.getItem('time')) - hours) * 60);
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }
  var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  time_div.textContent = timeString
  function toggleMenu() {
    if (isAct) {
      menu.classList.remove('show');
      isAct = false;
    } else {
      menu.classList.add('show');
      isAct = true;
    }
  }
  let span_descr = document.querySelectorAll('.descr');
  span_descr.forEach(el => {
      var classList = el.classList
      var regex = /\d+\.\d+/;
      for (let i = 0; i < classList.length; i++) {
          if (classList[i].indexOf('food') !== -1) {
              var match = regex.exec(classList);
              el.textContent = (parseFloat(match[0])*100) +'% найти еду'
              break;}
          for (var m = 0; m < classList.length; m++) {
              for (var j = 0; j < window.stringsToCheck.length; j++) {
                if (classList[m].indexOf(stringsToCheck[j]) !== -1) {
                  var match = regex.exec(classList);
                  el.textContent = (parseFloat(match[0]) * 100) + '% найти ' + window.stringsToCheck[j];
                  break;}}}}})
  function updateProgressBar(percent) {
    progressBar.style.setProperty('--progress-percent', percent+'%');
  }
  
  health = parseInt(localStorage.getItem('health'))
  food_stat = document.querySelector('.food_stat')
  parsedFood = parseInt(localStorage.getItem('foods'))
  if (parsedFood >= 200) {food_stat.innerHTML = '<span class="g-green">Очень много припасов</span>'}
  else if (parsedFood >= 100){food_stat.innerHTML = 'На 2 дня'}
  else if (parsedFood >= 70){food_stat.innerHTML = '<span class="g-danger">Средне</span>'}
  else if (parsedFood >= 30){food_stat.innerHTML = '<span class="g-danger">Очень мало</span>'}
  else if (parsedFood > 0){food_stat.innerHTML = '<span class="g-red">Закуска</span>'}
  else {food_stat.innerHTML = '<span class="g-red">Нет</span>'}

  strength = parseInt(localStorage.getItem('strength'))
  if (strength >= 100) {
    strength_stat.innerHTML = '<span class="g-green">Полна энергии!</span>'
  }
  else if (strength >= 50) {
    strength_stat.innerHTML = '<span class="g-green">В норме</span>'
  }
  else if (strength >= 35 && strength < 50) {
    strength_stat.innerHTML = '<span class="g-danger">Истощена</span>'
  }
  else {
    strength_stat.innerHTML = '<span class="g-red">Вырубаешься</span>'
  }
  if (decay_status >= 50) {
    dec_stat.innerHTML = '<span class="g-red">Сильное</span>'
    decay_display.classList.add('show')
    dec_disp_1.classList.add('show')
  }
  else if (decay_status >= 20) {
    dec_stat.innerHTML = '<span class="g-danger">Угроза!</span>'
    decay_display.classList.add('show')
  }
  else if (decay_status == 0) {
    dec_stat.innerHTML = '<span class="g-green">Нет</span>'
  }
  else if (decay_status < 20) {
    dec_stat.innerHTML = '<span class="g-danger">Немного</span>'
  }

  if (pregnant >= 1) {
    pregn.innerHTML = '<span class="g-meek">В положении</span>'
    belly.classList.add('show')
  }
  else {
    pregn.innerHTML = '<span class="g-green">Нет</span>'
  }
  

  //  Проверка на одежду
  clothe_set = localStorage.getItem('clothe_set')
  var curr_clothe_set = clothe_set ? clothe_set : 'pink';
  // curr_clothe_set = 'hazel'

  cl_path = '/images/girl/catalog/' + curr_clothe_set + '/icon/'+curr_clothe_set+'-'
  clothe_display.setAttribute('src', cl_path+clothe_status+'.png')
  
  string_f = f_img.getAttribute('src').replace('pink', curr_clothe_set)
  f_img.setAttribute('src', string_f)
  string_s = s_img.getAttribute('src').replace('pink', curr_clothe_set)
  s_img.setAttribute('src', string_s)
  string_t = t_img.getAttribute('src').replace('pink', curr_clothe_set)
  t_img.setAttribute('src', string_t)

  g_icon = document.querySelector('.g_icon')
  icon_path = '/images/girl/avatar/'
  g_icon.setAttribute('src', icon_path + curr_clothe_set+'/avatar.jpg')
  g_icon.addEventListener('click', toggleSlider)
  sl_left.addEventListener('click', toggleSlide)
  sl_right.addEventListener('click', toggleSlide)

  g_icon.style.setProperty('--lust', lust+'px')
  if (lust<=0) {
    g_icon.style.setProperty('--blur', '2px')
  }
  else if (lust>=50){g_icon.style.setProperty('--blur', '20px');soaks.classList.add('show')}
  else{g_icon.style.setProperty('--blur', '5px')}
  
  function toggleSlider() {
    if (!isSlideShown) {
      g_slider.classList.add('show')
      isSlideShown = true
      
    } else {g_slider.classList.remove('show');isSlideShown = false}
  }
  function toggleSlide() {
    if (curr_slide === 3) {
      slider_first_el.classList.add('show')
      slider_third_el.classList.remove('show')
      curr_slide = 1
    }
    else if (curr_slide === 2) {
      slider_second_el.classList.remove('show')
      slider_third_el.classList.add('show')
      curr_slide++
      
    } else if (curr_slide === 1) {
      slider_second_el.classList.add('show')
      slider_first_el.classList.remove('show')
      curr_slide++
    }
  }
  const health_progress = health;
  updateProgressBar(health_progress)
  updateHungerBar(hunger)

  hunger = parseFloat(localStorage.getItem('hunger'))
  function updateHungerBar(percent) {
    
    const hungryBar = document.querySelector('.rect_hungry');
    oldWidth = 138;
    newWidth = oldWidth - parseFloat((percent * 1.38))
    if (window.location.pathname === '/story/500') {
      hungryBar.style.width = 0
    }
    else{hungryBar.style.width = newWidth+'px'}
    
  }
  }, 100)

setTimeout(() => {
  mask.classList.add('anim_out')
  setTimeout(() => {
    mask.classList.add('hide')
  }, 1200);
}, 300);