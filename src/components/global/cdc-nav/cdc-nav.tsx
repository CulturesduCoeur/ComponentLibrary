import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-nav',
  styleUrl: 'cdc-nav.css',
  shadow: true,
})
export class CdcNav {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
