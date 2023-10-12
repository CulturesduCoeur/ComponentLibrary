import { Component, Host, h, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'main-button-save',
  styleUrl: 'main-button-save.css',
  shadow: true,
})
export class MainButtonSave {
  @State() isLoading: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() autocheck: boolean = true;
  @Prop() isvalid: boolean = false;
  private button: HTMLElement;

  constructor() {
    this.onBlur = this.onBlur.bind(this);
  }

  @Watch('isvalid')
  handleExternalValidation(newValue: boolean) {
    if (newValue) this.button.classList.add('active');
    else this.button.classList.remove('active');
  }

  @Watch('loading')
  handleLoading(newValue) {
    this.isLoading = newValue;
    this.button.classList.remove('active');
  }

  componentDidLoad() {
    const inputs = document.forms[0]?.elements;

    if (this.isvalid) {
      this.button.classList.add('active');
    }
    if (inputs === undefined) return;
    for (let i = 0; i < inputs.length; ++i) {
      inputs[i].addEventListener('blur', this.onBlur);
    }
  }

  onBlur() {
    if (this.autocheck) {
      const inputs = document.forms[0].elements;

      for (let i = 0; i < inputs.length; ++i) {
        if (inputs[i].hasAttribute('required') && (inputs[i] as HTMLInputElement).value === '') {
          this.button.classList.remove('active');
          return;
        } else {
          this.button.classList.add('active');
        }
      }
    }
  }

  render() {
    return (
      <Host>
        <div class="cdc-main-button" ref={el => (this.button = el)}>
          {!this.isLoading ? (
            <svg class="valid" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.5 11.25L16.875 31.875L7.5 22.5" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          ) : (
            <svg
              class="loading"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            </svg>
          )}
        </div>
        <slot />
      </Host>
    );
  }
}
