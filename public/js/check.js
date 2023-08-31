setTimeout(() => {
    time_div = document.querySelector('.time')
    inform = document.querySelector('.inform')
    menu = document.querySelector('.girl-menu')
    inform.addEventListener('click', toggleMenu);
    g_slider = document.querySelector('.g-slider')
    sl_right = document.querySelector('.sl_right')
    sl_left = document.querySelector('.sl_left')
    slider_first_el = document.querySelector('.slider_first_el')
    slider_second_el = document.querySelector('.slider_second_el')
    f_img = document.querySelector('.f_img')
    s_img = document.querySelector('.s_img')
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
      const progressBar = document.querySelector('.progress-bar');
      progressBar.style.setProperty('--progress-percent', percent+'%');
    }
    
    health = parseInt(localStorage.getItem('health'))
    food_stat = document.querySelector('.food_stat')
    food_stat.textContent = parseInt(localStorage.getItem('foods'))

    clothe_set = localStorage.getItem('clothe_set')
    var curr_clothe_set = clothe_set ? clothe_set : 'pink';
    // curr_clothe_set = 'hazel'

    string_f = f_img.getAttribute('src').replace('pink', curr_clothe_set)
    f_img.setAttribute('src', string_f)
    string_s = s_img.getAttribute('src').replace('pink', curr_clothe_set)
    s_img.setAttribute('src', string_s)

    g_icon = document.querySelector('.g_icon')
    icon_path = '/images/girl/avatar/'
    g_icon.setAttribute('src', icon_path + curr_clothe_set+'/avatar.jpg')
    g_icon.addEventListener('click', toggleSlider)
    sl_left.addEventListener('click', toggleSlide)
    sl_right.addEventListener('click', toggleSlide)

    function toggleSlider() {
      if (!isSlideShown) {
        g_slider.classList.add('show')
        isSlideShown = true
        
      } else {g_slider.classList.remove('show');isSlideShown = false}
    }
    function toggleSlide() {
      if (curr_slide >= 2) {
        slider_first_el.classList.add('show')
        slider_second_el.classList.remove('show')
        curr_slide--
        
      } else if (curr_slide == 1) {
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



