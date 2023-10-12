import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'main-button-add',
  styleUrl: 'main-button-add.css',
  shadow: true,
})

export class MainButtonSave {
  @Prop() color: string = "#009ee1";

  render() {
    return (
      <Host>
        <div class="cdc-main-button" style={{background: this.color}}>
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="17" x2="32" y2="17" stroke="white" stroke-width="6" stroke-linecap="round"/>
            <line x1="17.5" y1="32" x2="17.5" y2="3" stroke="white" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
        <slot />
      </Host>
    );
  }
}
