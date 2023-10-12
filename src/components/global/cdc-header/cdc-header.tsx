import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-header',
  styleUrl: 'cdc-header.css',
  shadow: true,
})
export class CdcHeader {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
