import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'cdc-modal',
  styleUrl: 'cdc-modal.css',
  shadow: true,
})
export class CdcModal {
  private _content: HTMLElement;
  @Prop({ mutable: true }) active: boolean = false;
  @State() internalActive: boolean = false;

  @Watch('active')
  handleProps(newValue: boolean) {
    if (newValue === false) {
      this._content.classList.add('active');
      setTimeout(() => {
        this.internalActive = newValue;
      }, 200);
    } else {
      this._content.classList.remove('active');
      this.internalActive = newValue;
    }
  }

  handleActive = value => {
    this._content.classList.add('active');
    setTimeout(() => {
      this.internalActive = value;
      this.active = value;
    }, 200);
  };

  render() {
    return (
      <Host style={{ display: this.internalActive ? 'flex' : 'none' }}>
        <div class="background" onClick={() => this.handleActive(false)} />
        <div class="content" ref={el => (this._content = el as HTMLElement)}>
          <div class="header">
            <div class="close-button" onClick={() => this.handleActive(false)}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="17" x2="32" y2="17" stroke="black" stroke-width="6" stroke-linecap="round" />
                <line x1="17.5" y1="32" x2="17.5" y2="3" stroke="black" stroke-width="6" stroke-linecap="round" />
              </svg>
            </div>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
