import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'multi-select',
  styleUrl: 'multi-select.css',
  shadow: true,
})
export class MultiSelect {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
