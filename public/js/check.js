
setTimeout(() => {
    let span_descr = document.querySelectorAll('.descr');
    span_descr.forEach(el => {
        var classList = el.classList
        var regex = /\d+\.\d+/;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('food') !== -1) {
                var match = regex.exec(classList);
                el.textContent = (parseFloat(match[0])*100) +'% найти еду'
                break;
            }
            for (var m = 0; m < classList.length; m++) {
                for (var j = 0; j < window.resources.length; j++) {
                  if (classList[m].indexOf(resources[j]) !== -1) {
                    var match = regex.exec(classList);
                    el.textContent = (parseFloat(match[0]) * 100) + '% найти ' + window.resources[j];
                    break;
                  }
                }
              }


        }
        /* else if (el.classList.contains('return_try_find')){
            el.textContent = '(50% найти скотч)';
        } */
    });
}, 10);




