import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cdc-table',
  styleUrl: 'cdc-table.css',
  shadow: true,
})
export class CdcTable {
  @Prop() pageselector: boolean = true;
  @Prop() numberofpages: number;
  @Prop() goToPage: number = 1;

  render() {
    return (
      <Host>
        <slot></slot>
        {this.pageselector ? <page-selector numberofpages={this.numberofpages} gotopage={this.goToPage}></page-selector> : null}
      </Host>
    );
  }
}
