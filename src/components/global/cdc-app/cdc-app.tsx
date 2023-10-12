import { Component, Host, h } from '@stencil/core';

import svg1 from "./../../../assets/global/svg-1.svg";
import svg2 from "./../../../assets/global/svg-2.svg";

@Component({
  tag: 'cdc-app',
  styleUrl: 'cdc-app.css',
  shadow: true,
})
export class CdcApp {

  render() {
    return (
      <Host>
        <div class="cdc-main-wrapper">
          <img class="first-svg" src={svg1} alt="" />
          <img class="second-svg" src={svg2} alt="" />
        </div>
        <main>
          <slot></slot>
        </main>
      </Host>
    );
  }

}
