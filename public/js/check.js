setTimeout(() => {
    let span_descr = document.querySelectorAll('.descr');

    span_descr.forEach(el => {
        if (el.classList.contains('e_encountZ')) {
            el.textContent = '(24% встретить врага)';
        }
        else if (el.classList.contains('e_encountZ')){
            
        }
    });
}, 10);




