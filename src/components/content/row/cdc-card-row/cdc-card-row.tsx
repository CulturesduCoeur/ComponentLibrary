import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'cdc-card-row',
  styleUrl: 'cdc-card-row.css',
  shadow: true,
})
export class CdcCardRow {
  private wrapper?: HTMLElement;
  private content?: HTMLElement;
  private scrollBar?: HTMLElement;
  @State() isSelected: boolean;

  componentDidLoad() {
    const wrapperWidth = this.wrapper.offsetWidth; // Width of the container with overflow hidden
    const contentWidth = this.content.clientWidth; // width of all the content
    const scroll = this.scrollBar.firstChild as HTMLElement; // getting the scrollBar within the wrapper
    const initialScrollValue = this.content.getBoundingClientRect().x; // initial absolute position of the content in the window
    const difference = wrapperWidth - contentWidth // difference between the two container width

    // Recreate scroll
    const handleScroll = (e) => {
        this.content.style.transition = "none";
        scroll.style.transition = "none";
        const xtmp = this.content.getBoundingClientRect().x - initialScrollValue - (e.deltaX / 3);
        const xpos = xtmp > 0 ? 0 : xtmp < difference ? difference : xtmp;
        const scrollpos = (this.scrollBar.offsetWidth - scroll.offsetWidth) * (xpos / difference);
        this.content.style.transform = `translate3d(${xpos}px, 0, 0)`;
        scroll.style.transform = `translate3d(${scrollpos}px, 0, 0)`;
    }

    // Recreate scrollBar Drag
    const handleDrag = (e) => {
      if(this.isSelected) {
        this.scrollBar.classList.add("active");
        this.content.style.transition = "none";
        scroll.style.transition = "none";
        const rect = this.scrollBar.getBoundingClientRect();
        const xTmp = (e.clientX - rect.left) / this.scrollBar.offsetWidth;
        const x = xTmp < 0 ? 0 : xTmp > 1 ? 1 : xTmp;
        const xpos = difference  * x;
        const scrollpos = (this.scrollBar.offsetWidth - scroll.offsetWidth) * x; 
  
        this.content.style.transform = `translate3d(${xpos}px, 0, 0)`;
        scroll.style.transform = `translate3d(${scrollpos}px, 0, 0)`;
      }
    
    }

    // Handle Click on the scroll bar container
    const handleClick = (e) => {
      const rect = this.scrollBar.getBoundingClientRect();
      const xTmp = (e.clientX - rect.left) / this.scrollBar.offsetWidth;
      const x = xTmp < 0 ? 0 : xTmp > 1 ? 1 : xTmp;
      const xpos = difference  * x;
      const scrollpos = (this.scrollBar.offsetWidth - scroll.offsetWidth) * x; 

      this.content.style.transition = ".4s ease-in-out";
      scroll.style.transition = ".4s ease-in-out";
      this.content.style.transform = `translate3d(${xpos}px, 0, 0)`;
      scroll.style.transform = `translate3d(${scrollpos}px, 0, 0)`;
    }

    // Handle Drag launch
    const handleMouse = (bool) => {
      this.isSelected = bool;
    }


    // if the content if bigger than the container
    if(difference < 0) {
      scroll.style.width = `${(wrapperWidth / contentWidth) * 100}%`; /* Define the proper width of the scrollbar despite
      of the content width */

      // Adding all event needed
      this.wrapper.addEventListener("mouseenter", () => {
        this.scrollBar.classList.add("active");
      });
      this.wrapper.addEventListener("mouseleave", () => {
        this.scrollBar.classList.remove("active");
      });
      this.wrapper.addEventListener("wheel", handleScroll);
      this.scrollBar.addEventListener("click", handleClick);
      scroll.addEventListener("mousedown", () => handleMouse(1));
      document.addEventListener("mouseup", () => handleMouse(0));
      document.addEventListener("mousemove", handleDrag);
    }
  }

  render() {
    return (
      <Host ref={el => this.wrapper = el as HTMLElement}>
        <div class="card-container" ref={el => this.content = el as HTMLElement}>
          <slot></slot>
        </div>
        <div class="scrollbar-wrapper" ref={el => this.scrollBar = el as HTMLElement}>
          <div class="scrollbar"/>
        </div>
      </Host>
    );
  }

}
