import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'main-button-multi-add',
  styleUrl: 'main-button-multi-add.css',
  shadow: true,
})

export class MainButtonSave {
  @State() isOpen: boolean = false;

  handleClick =(ev) => {
    ev.preventDefault();
    this.isOpen = !this.isOpen;
  }

  render() {
    return (
      <Host >
        <div class={`cdc-main-button ${this.isOpen ? "active" : null}`} onClick={this.handleClick}>
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="17" x2="32" y2="17" stroke="white" stroke-width="6" stroke-linecap="round"/>
            <line x1="17.5" y1="32" x2="17.5" y2="3" stroke="white" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
        <slot name="indication"/>
        {
          this.isOpen &&
          <slot name="buttons" />
        }
      </Host>
    );
  }

}
