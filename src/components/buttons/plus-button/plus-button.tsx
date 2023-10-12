import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'plus-button',
  styleUrl: 'plus-button.css',
  shadow: true,
})
export class PlusButton {

  render() {
    return (
      <Host>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="11.7144" x2="22" y2="11.7144" stroke-width="4" stroke-linecap="round" />
          <line x1="12.0571" y1="22" x2="12.0571" y2="2" stroke-width="4" stroke-linecap="round" />
        </svg>
      </Host>
    );
  }

}
