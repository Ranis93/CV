"use strict";

window.addEventListener('DOMContentLoaded', () => {
    let links = document.querySelectorAll('[href^="#"]');      // все ссылки котор. начинаются с # т.е. локальные .
    let speed = 0.5;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                startTime = null;
                // .getBoundingClientRect() дает доступ получить доступ к свойствам.

            requestAnimationFrame(step);

            function step(time) {
                if (startTime === null) {
                    startTime = time;
                }

                let progress = time - startTime,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);        // анимация по коор. у .

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
});