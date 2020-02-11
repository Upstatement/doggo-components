class DoggyDog extends HTMLElement {
  constructor() {
    super();
    this.type = this.getAttribute('type');
    this.command = this.getAttribute('command');
  }

  /**
   * Called when this element is added to the document.
   */
  connectedCallback() {
    console.log(`Come here, ${this.type}! 🐶`);
    
    this.shadow = this.attachShadow({ mode: 'open' });
    this.createStyles();
    this.setupImage();
  }
  
  /**
   * Called when this component is removed from the document.
   */
  disconnectedCallback() {
    console.log('👋 🐶');
  }

  /**
   * This function is called whenever an attribute we are observing
   * is updated.  We specify which attributes we want to observe
   * in `observedAttributes`
   * 
   * @param {String} name attribute name (i.e. 'type' or 'command')
   * @param {String} oldValue the previous value
   * @param {String} newValue the new value we want
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadow) {
      return;
    }
    const image = this.shadow.querySelector('img');
    this[name] = newValue;
    if (name === 'command') {
      console.warn(`Ok ${this.type}, ${newValue}!`);
      if (oldValue) {
        image.classList.remove(oldValue);
      }

      if (newValue) {
        image.classList.add(newValue);
      }
    } else if (name === 'type') {
      console.warn(`Come here, ${this.type}!`);
      this.shadow.removeChild(image);
      this.setupImage();
    }
  }

  /**
   * Returns an array of the element attributes we want to observe
   */
  static get observedAttributes() { 
    return ['type', 'command']; 
  }

  /**
   * We create the actual image element and append it to our shadow dom
   * We look at the type specified to find the appropriate adorable picture
   */
  setupImage() {
    switch (this.type) {
      case 'pup':
        this.imageURL = 'https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg';
        break;
      case 'pupper':
        this.imageURL = 'https://blog-cdn.dogbuddy.com/wp-content/uploads/2017/03/cute-puppy-1.png';
        break;
      case 'pupperino':
        this.imageURL = 'https://cdn-az.allevents.in/banners/a98430341596f2c6938e1d6075774190';
        break;
      case 'doge':
        this.imageURL = 'https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png';
        break;
      case 'snoop':
        this.imageURL = 'https://www.gannett-cdn.com/-mm-/794bead6f8c43e8685ed35bd0626bf87a086c9ce/c=0-36-1182-922/local/-/media/2018/04/12/USATODAY/usatsports/7d6e4edfa2684f5bbd0835d9d9ddbcb2.jpg?width=540&height=405&fit=crop';
        break;
      case 'floof':
        this.imageURL = 'https://pbs.twimg.com/profile_images/1070961472342155264/2bcbqQvH_400x400.jpg';
        break;
      case 'kitty':
        this.imageURL = 'https://st.depositphotos.com/1606449/3372/i/950/depositphotos_33722805-stock-photo-puppy-wearing-cat-ears-for.jpg';
        break;
      case 'bunny':
        this.imageURL = 'https://petcostumecenter.com/wp-content/uploads/2018/06/dog-bunny-ears.jpg';
        break;
      default:
        this.imageURL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg';
    }
    this.removeExistingImage();

    const image = new Image();
    image.src = this.imageURL;
    image.classList.add(this.command);
    this.shadow.appendChild(image);
  }

  /**
   * Removes the image
   * 
   * We do this since someone could technically call `document.querySelector('doggy-dog').setupImage()`
   * to force a rerender
   */
  removeExistingImage() {
    const existingImage = this.shadow.querySelector('img');
    if (existingImage) {
      this.shadow.removeChild(existingImage);
    }
  }

  /**
   * Create the styles for our doggos
   * We do this as a normal string rather than using @import
   * since it is not supported in all browsers
   * 
   * (same for new CSSStyleSheet, which is only supported in Chrome)
   */
  createStyles() {
    const styleTemplate = `
    <style>
    .rollover {
      animation-name: spin;
      animation-duration: 5000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear; 
    }
    .growl {
      animation: growl 0.5s;
      animation-iteration-count: infinite;
    }
    @keyframes spin {
      from {
        transform:rotate(0deg);
      }
      to {
        transform:rotate(360deg);
      }
    }
    @keyframes growl {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
    </style>`
    this.shadow.innerHTML = styleTemplate;
  }
};

/**
 * Register our custom element
 */
window.addEventListener('DOMContentLoaded', () => {
  customElements.define('doggy-dog', DoggyDog);
});