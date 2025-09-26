
import myElement from "./myElement";
import container from "./container";

export default class main {

  constructor() {

    // Create container elements with accordions (they now handle their own images)
    this.containerInstance = new container();
    
    // Create myElement
    new myElement();
  }

} // END class
