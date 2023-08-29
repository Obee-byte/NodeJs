setTimeout(() => {
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
    
    // Пример использования: обновляем прогресс-бар до 75%
    const progress = 100;
    updateProgressBar(progress);
                  
    }, 10)



