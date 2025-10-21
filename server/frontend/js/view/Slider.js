import Utilities from "../utilities/utilities.js";


class Slider{
    slideContainer = undefined;
    numberOfSlides = 0;
    active = 1;

    constructor(slideContainer){
        this.slideContainer = slideContainer;
        this.init();
        this.activateBtns();
        return this.slideContainer;
    }

    #setActive(number){
        this.active =  number <= this.numberOfSlides ? number : this.numberOfSlides;
        this.active = 0 < this.active ? this.active : 1;
        this.slideContainer.setAttribute('active' , this.active);
        this.slideContainer.style.setProperty("--active-slide" , this.active);
        return 0;

    }

    next(){
        this.#setActive(this.active + 1);
    }

    previous(){
        this.#setActive(this.active - 1);
    }

    activateBtns(){
        if(this.nextBtns?.length){
            this.nextBtns?.forEach(nextBtn=>{
                nextBtn.addEventListener('click' ,()=>{
                this.next();
            })
        });
    }
    

    if(this.previousBtns?.length){
        this.previousBtns?.forEach(previousBtn=>{
            previousBtn.addEventListener('click' , ()=>{
                this.previous();
            })
            });
        }
    }


    init(){
        try{

            //replace slide-container tag to div
            this.slideContainer.dataset.role = "slide-container";
            this.slideContainer = Utilities.replaceTag(this.slideContainer , 'div');
            this.#setActive(this.active);
            
            //replace slide set tag
            this.slideSet = this.slideContainer.querySelector('slide-set');
            if(!this.slideSet){
                throw new Error("<slide-set> tag not defined");
                return;
            }
            this.slideSet.dataset.role="slide-set";
            this.slideSet = Utilities.replaceTag(this.slideSet , 'div');

            
            //select All Slides
            this.slides = this.slideSet.querySelectorAll('slide-window');
            
            
            //calculate number of slides
            this.numberOfSlides = this.slides.length || 0;
            
            //replace all slides with div tags
            this.slides?.forEach((slide , i)=>{
                slide.dataset.role = "slide";
                Utilities.replaceTag(slide , 'div');
            });
            
            //replace next and previous btns
            const nextTags = this.slideContainer.querySelectorAll('slide-next');
            const previousTags = this.slideContainer.querySelectorAll('slide-previous');


            this.nextBtns = [];
            nextTags.forEach(nextTag=>{
                nextTag.dataset.role="slide-next"
                this.nextBtns.push(Utilities.replaceTag(nextTag , 'button'));
            });
            
            this.previousBtns = []
            previousTags.forEach(previousTag=>{
                previousTag.dataset.role="slide-previous"
                this.previousBtns.push(Utilities.replaceTag(previousTag , 'button'));   
            });

            
        }catch(error){
            console.log(error);
        }
    }

}



const slideContainers = document.querySelectorAll('slide-container');

slideContainers.forEach(slideSet=>{
    const sliders = new Slider(slideSet);
    
    
})
