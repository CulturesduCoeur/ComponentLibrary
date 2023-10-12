import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-card-grid',
  styleUrl: 'cdc-card-grid.css',
  shadow: true,
})
export class CdcCardGrid {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
