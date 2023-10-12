import { Component, Host, Prop, h, State, Listen, Element } from '@stencil/core';

//Interface
import { DropdownValue } from '../../../assets/interface/dropdown.interface';

import Arrow from '../../../assets/svg/Arrow.svg';

@Component({
  tag: 'cdc-filter-dropdown',
  styleUrl: 'cdc-filter-dropdown.css',
  shadow: true,
})
export class CdcDropdown {
  private _arrayData: DropdownValue[] = []; // Array processed
  private localRef: HTMLElement;
  @Element() el: HTMLElement; //Main element to get the select inside
  childEl: HTMLSelectElement; // Will be the select wanted
  @State() value: DropdownValue = { name: '', value: '', key: 0 }; // Value choosen
  @State() showList: boolean; // Handle the list display
  @Prop() placeholder: string = ''; // Placeholder you're passing by prop

  // Click listening for shutting down the choice list when click outside appear
  @Listen('click', { target: 'window' })
  handleClick(ev) {
    if (ev.target instanceof HTMLElement && !this.localRef?.contains(ev.target) && this.showList) {
      this.showList = false;
    }
  }

  // Handle data selected
  handleValue(listValue) {
    this.value = listValue;
    this.childEl.options[listValue.key].selected = true;
    this.childEl.dispatchEvent(new Event('change'));
  }

  // Get the select inside the tag, get and translate its values for the component.
  componentWillLoad() {
    this.childEl = this.el.firstElementChild as HTMLSelectElement;
    for (let i = 0; i < this.childEl.options.length; ++i) {
      this._arrayData = [...this._arrayData, { name: this.childEl.options[i].text, value: this.childEl.options[i].value, key: i }];
    }
  }

  // Handle the display of the list
  handleList(e) {
    e.preventDefault();
    this.showList = !this.showList;
  }

  render() {
    return (
      <Host onClick={e => this.handleList(e)}>
        <div class="input-wrapper" ref={el => (this.localRef = el as HTMLElement)}>
          {/* Placeholder */}
          <p class={this.value.name.length ? 'active' : ''}>{this.value.name.length ? this.value.name : this.placeholder}</p>
          {/* Arrow to signify dropdown menu */}
          <img src={Arrow} alt="Arrow Button" class={this.showList && 'active'} />

          {/* Display of the different choices */}
          {this.showList && (
            <div class="choice-list">
              {this._arrayData.map(x => {
                return (
                  <div class="row" onClick={() => this.handleValue(x)}>
                    <p>{x.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Send value to the slot select */}
        <attr-injector attrs={{ value: this.value.value, selectedIndex: this.value.key }}>
          <slot />
        </attr-injector>
      </Host>
    );
  }
}
