
import { carouselHandler } from "./handlers/carouselHandler.js";


function route() {
    const path = window.location.pathname;
    console.log(path);

    switch (path) {
        case "/":
        case "/index.html":
            carouselHandler();
            break;   
    }
}

route();


