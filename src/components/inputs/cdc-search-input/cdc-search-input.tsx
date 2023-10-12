import { Component, Host, h, Prop, State, Watch, Element, Listen } from '@stencil/core';

import Search from './../../../assets/svg/Search.svg';

@Component({
  tag: 'cdc-search-input',
  styleUrl: 'cdc-search-input.css',
  shadow: true,
})
export class CdcSearchInput {
  @Element() el: HTMLElement;
  childEl: HTMLInputElement;
  private _processArrayData: Array<any> = [];
  private inputRef: HTMLInputElement;
  @State() inputValue: string = '';
  @State() sortedDataList: Array<any> = [];
  @State() selectedItem = '';
  @State() listDisplay: boolean = false;
  @State() loading: boolean = false;
  @Prop() placeholder: string = '';
  @Prop() datalist: string = ''; //The search data , need to have at least name and id properties

  @Watch('datalist')
  parseOptions() {
    if (this.datalist) {
      if (!this.datalist.length) {
        this.loading = true;
        return;
      }
      this._processArrayData = JSON.parse(this.datalist);
      this.sortedDataList = this._processArrayData;
      this.loading = false;
    }
  }

  @Listen('click', { target: 'window' })
  handleClick(ev) {
    if (ev.target instanceof HTMLElement && !this.el?.contains(ev.target) && this.listDisplay) {
      this.listDisplay = false;
    }
  }

  @Watch('inputValue')
  handleInputChange(newValue: string) {
    const arrayTmp = this._processArrayData;
    this.sortedDataList = arrayTmp.filter(el => {
      return el.name.toUpperCase().indexOf(newValue.toUpperCase()) > -1;
    });
  }
  componentWillLoad() {
    this.childEl = this.el.firstElementChild as HTMLInputElement;
    this.selectedItem = this.childEl.value;
    this.childEl.addEventListener('change', ev => {
      const value = (ev.target as HTMLInputElement).value;

      if (value.length && this._processArrayData !== undefined) {
        const name = this._processArrayData.filter(el => parseInt(el.id) === parseInt(value))[0]
          ? this._processArrayData.filter(el => parseInt(el.id) === parseInt(value))[0].name
          : 'error';
        this.inputRef.value = name;
        this.selectedItem = (ev.target as HTMLInputElement).value;
      } else {
        this.inputRef.value = '';
        this.selectedItem = '';
      }
    });
  }

  handleInputValue(ev) {
    this.inputValue = ev.target.value;
  }

  handleListDisplay(value: boolean) {
    this.listDisplay = value;
  }

  handleItem(el) {
    this.selectedItem = el.id;
    this.childEl.value = el.id;
    this.listDisplay = false;
    this.inputRef.value = el.name;
    this.childEl.dispatchEvent(new Event('change'));
  }

  render() {
    return (
      <Host>
        <div class={`result-wrapper ${this.selectedItem ? 'active' : null}`}>
          <slot name="result" />
        </div>
        <div class="input-wrapper">
          <img src={Search} alt="search" />
          <input
            type="text"
            ref={el => (this.inputRef = el as HTMLInputElement)}
            placeholder={this.placeholder}
            onFocus={() => this.handleListDisplay(true)}
            onInput={ev => this.handleInputValue(ev)}
          />
        </div>

        {this.listDisplay ? (
          <div class="choice-list">
            {this.sortedDataList.map(el => (
              <div class="row" onClick={() => this.handleItem(el)}>
                <p>{el.name}</p>
              </div>
            ))}
          </div>
        ) : null}

        <slot></slot>
      </Host>
    );
  }
}
