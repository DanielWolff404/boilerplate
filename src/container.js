import gsap from "gsap";

class container{

    constructor(){

        this.container = document.createElement("div");
        this.container.id = "container";
        document.body.appendChild(this.container);

        // Load image data first, then create accordions
        this.loadImageData();
    }

    async loadImageData() {
        try {
            const response = await fetch('./assets/json/imgdata.json');
            this.imageData = await response.json();
            this.images = this.imageData.content;
            
            // Create accordion items after data is loaded
            this.createAccordionItem("SomeContent", "Nature Gallery", 0);
            this.createAccordionItem("OtherContent", "Urban Collection", 1);
            this.createAccordionItem("MoreContent", "Artistic Series", 2);
            
        } catch (error) {
            console.error('Error loading image data:', error);
            // Create accordions with fallback content
            this.createAccordionItem("SomeContent", "Some Content", 0);
            this.createAccordionItem("OtherContent", "Other Content", 1);
            this.createAccordionItem("MoreContent", "More Content", 2);
        }

        // Track which accordion is currently open
        this.activeAccordion = null;
    }

    createAccordionItem(id, title, index) {
        // Create accordion wrapper
        const accordionWrapper = document.createElement("div");
        accordionWrapper.className = "accordion-wrapper";
        
        // Create accordion header (clickable)
        const accordionHeader = document.createElement("div");
        accordionHeader.id = id;
        accordionHeader.className = "accordion-header";
        accordionHeader.innerHTML = title;
        accordionWrapper.appendChild(accordionHeader);

        // Create accordion content (hidden by default)
        const accordionContent = document.createElement("div");
        accordionContent.className = "accordion-content";
        accordionContent.id = `${id}-content`;
        
        // Add picture content for each accordion
        const pictureDiv = document.createElement("div");
        pictureDiv.className = "accordion-picture";
        
        // Populate with images from JSON data
        this.populatePictureDiv(pictureDiv, index);
        
        accordionContent.appendChild(pictureDiv);
        accordionWrapper.appendChild(accordionContent);
        this.container.appendChild(accordionWrapper);

        // Add click event listener
        accordionHeader.addEventListener("click", () => {
            this.toggleAccordion(accordionContent, accordionHeader);
        });
    }

    populatePictureDiv(pictureDiv, accordionIndex) {
        if (!this.images || this.images.length === 0) {
            pictureDiv.innerHTML = `<p>Loading images...</p>`;
            return;
        }

        // Create image gallery container
        const imageGallery = document.createElement('div');
        imageGallery.className = 'accordion-image-gallery';
        
        // Determine which images to show based on accordion index
        let imagesToShow;
        if (accordionIndex === 0) {
            // First accordion - show first 5 images
            imagesToShow = this.images.slice(0, 5);
        } else if (accordionIndex === 1) {
            // Second accordion - show middle 5 images  
            imagesToShow = this.images.slice(5, 10);
        } else {
            // Third accordion - show remaining images
            imagesToShow = this.images.slice(10);
        }

        // Create image elements with titles and descriptions
        imagesToShow.forEach((imageData, imgIndex) => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'accordion-image-item';
            
            const img = document.createElement('img');
            img.src = imageData.img;
            img.alt = imageData.title;
            
            const title = document.createElement('h4');
            title.textContent = imageData.title;
            title.className = 'image-title';
            
            const description = document.createElement('p');
            description.textContent = imageData.description;
            description.className = 'image-description';
            
            // Add click handler for cycling through images in this group
            img.addEventListener('click', () => {
                this.cyclePictureInAccordion(img, imagesToShow, imgIndex, title, description);
            });
            
            imageContainer.appendChild(img);
            imageContainer.appendChild(title);
            imageContainer.appendChild(description);
            imageGallery.appendChild(imageContainer);
        });
        
        pictureDiv.appendChild(imageGallery);
    }

    cyclePictureInAccordion(img, imageGroup, currentIndex, titleElement, descriptionElement) {
        // Find next image in the group
        const nextIndex = (currentIndex + 1) % imageGroup.length;
        const nextImage = imageGroup[nextIndex];
        
        // Update image source and alt text
        img.src = nextImage.img;
        img.alt = nextImage.title;
        
        // Update title and description
        if (titleElement) titleElement.textContent = nextImage.title;
        if (descriptionElement) descriptionElement.textContent = nextImage.description;
        
        // Add shake animation if GSAP is available
        if (typeof gsap !== 'undefined') {
            gsap.to(img, {
                duration: 0.5,
                x: "+=10",
                yoyo: true,
                repeat: 5,
                ease: "power2.inOut"
            });
        }
    }

    toggleAccordion(content, header) {
        const isCurrentlyOpen = content.classList.contains("active");
        
        // Close all accordions first
        const allContents = this.container.querySelectorAll(".accordion-content");
        const allHeaders = this.container.querySelectorAll(".accordion-header");
        
        allContents.forEach(item => {
            item.classList.remove("active");
        });
        
        allHeaders.forEach(item => {
            item.classList.remove("active");
        });

        // If the clicked accordion wasn't open, open it
        if (!isCurrentlyOpen) {
            content.classList.add("active");
            header.classList.add("active");
            this.activeAccordion = content;
        } else {
            this.activeAccordion = null;
        }
    }
}
export default container;