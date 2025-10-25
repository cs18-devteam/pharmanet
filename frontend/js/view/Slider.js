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
<<<<<<< HEAD
=======
<<<<<<< HEAD
        console.log(this.nextBtn);
        if(this.nextBtn){
            this.nextBtn.addEventListener('click' ,()=>{
                this.next();
                console.log("clicked next");
            });
        }

        console.log(this.previousBtn)
        if(this.previousBtn){
            this.previousBtn.addEventListener('click' , ()=> {
                this.previous()
                console.log("clicked previous");

            })
=======
>>>>>>> origin/hamdha/backend/order
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
<<<<<<< HEAD
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
            const nextTag = this.slideContainer.querySelector('slide-next');
            const previousTag = this.slideContainer.querySelector('slide-previous');
            nextTag.dataset.role="slide-next";
            previousTag.dataset.role="slide-previous";
            this.nextBtn = Utilities.replaceTag(nextTag , 'button');
            this.previousBtn = Utilities.replaceTag(previousTag , 'button');   
=======
>>>>>>> origin/hamdha/backend/order
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

<<<<<<< HEAD
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
            
        }catch(error){
            console.log(error);
        }
    }

}



const slideContainers = document.querySelectorAll('slide-container');

slideContainers.forEach(slideSet=>{
    const sliders = new Slider(slideSet);
    
    
})
