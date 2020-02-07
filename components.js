class DoggyDog extends HTMLElement {
  constructor() {
    super();
    this.type = this.getAttribute('type');
    this.action = this.getAttribute('action');
  }

  connectedCallback() {
    console.log('Come here, pups! 🐶');
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadow = shadowRoot;

    this.createStyles();
    this.setupImage();
  }
  
  disconnectedCallback() {
    console.log('👋 🐶');
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
      default:
        this.imageURL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg';
    }

    const image = new Image();
    image.src = this.imageURL;
    image.classList.add(this.action);
    this.shadow.appendChild(image);
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