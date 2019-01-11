import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

class Controls {

    constructor() {
        const _$keyDown = fromEvent(document, 'keydown');
        let lastDirection = '';
        this.$events = Observable.create((observer) => {
            _$keyDown.subscribe((e)=>{

                if (lastDirection === e.code) {
                    return;
                } else {
                    lastDirection = e.code;
                }

                switch(e.code) {
                    case 'ArrowDown': 
                        observer.next('down');
                    break;
                    case 'ArrowUp': 
                        observer.next('up');
                    break;
                    case 'ArrowLeft': 
                        observer.next('left');
                    break;
                    case 'ArrowRight': 
                        observer.next('right');
                    break;
                }
            })
        });
    }

}

export default new Controls();