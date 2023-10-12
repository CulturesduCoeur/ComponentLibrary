import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';

@Component({
  tag: 'cdc-checkbox',
  styleUrl: 'cdc-checkbox.css',
  shadow: true,
})
export class CdcCheckbox {
  @Element() el: HTMLElement; // Web component ref
  private childEl: HTMLInputElement; // input checkbox ref
  @State() internalChecked: boolean = false; // Internal state to store the checkbox value
  @Prop() text: string = ''; // text to display next to it
  @Prop() checked: boolean; // If you want to change dynamicaly the value of the checkbox outside of the component during the lifetime of the page

  // Transmit the value to the internal state
  @Watch('checked')
  handleChecked(newValue) {
    this.internalChecked = newValue;
  }

  // Check the input checkbox state at the beginning
  componentDidLoad() {
    this.childEl = this.el.firstElementChild as HTMLInputElement;
    this.internalChecked = this.childEl.checked;
  }

  // Handle the value change during click an transmit it to the input
  handleInternalCheck() {
    this.internalChecked = !this.internalChecked;
    this.childEl.checked = this.internalChecked;
    this.childEl.dispatchEvent(new Event('change'));
  }

  render() {
    return (
      <Host>
        <div onClick={() => this.handleInternalCheck()} class={`checkbox-wrapper ${this.internalChecked ? 'active' : ''}`}>
          <div class="dot"></div>
        </div>
        {this.text.length ? <p>{this.text}</p> : null}
        <slot />
      </Host>
    );
  }
}
