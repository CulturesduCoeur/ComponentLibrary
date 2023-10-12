import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cdc-table-line',
  styleUrl: 'cdc-table-line.css',
  shadow: true,
})
export class CdcTableLine {
  render() {
    return (
      <Host>
        <slot name="img" />
        <slot></slot>
        <slot name="buttonRow" />
      </Host>
    );
  }
}
