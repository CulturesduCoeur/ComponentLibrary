import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-creneau-table',
  styleUrl: 'cdc-creneau-table.css',
  shadow: true,
})
export class CdcCreneauTable {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
