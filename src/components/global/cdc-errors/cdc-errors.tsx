import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-errors',
  styleUrl: 'cdc-errors.css',
  shadow: true,
})
export class CdcErrors {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
