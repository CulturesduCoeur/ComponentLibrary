import { Component, Host, h, State, Element, Watch, Prop } from '@stencil/core';
import { DatePickerValue } from '../../../../assets/interface/datepicker.interface';

@Component({
  tag: 'cdc-date-picker',
  styleUrl: 'cdc-date-picker.css',
  shadow: true,
})
export class CdcDatePicker {
  @Element() el: HTMLElement;
  private childEl: HTMLInputElement;
  @State() data: DatePickerValue = {
    day: '',
    month: '',
    year: '',
  };
  @Prop() text: string = '';

  componentWillLoad() {
    this.childEl = this.el.firstElementChild as HTMLInputElement;
    console.log(this.childEl.value);
    if (this.childEl.value.length) {
      this.data = {
        day: this.childEl.value.substring(8, 10),
        month: this.childEl.value.substring(5, 7),
        year: this.childEl.value.substring(0, 4),
      };
    }
    this.childEl.addEventListener('change', ev => this.handleInputChange(ev));
  }

  @Watch('data')
  handleDataChange(newValue: DatePickerValue) {
    const { day, month, year } = newValue;
    if (day.length && month.length && year.length) this.childEl.value = `${year}-${month}-${day}`;
  }

  handleInputChange(ev) {
    if (ev.target.value.length) {
      this.data = {
        day: ev.target.value.substring(8, 10),
        month: ev.target.value.substring(5, 7),
        year: ev.target.value.substring(0, 4),
      };
    } else {
      this.data = {
        day: '',
        month: '',
        year: '',
      };
    }
  }

  handleChange(ev, key) {
    if (key === 0 && ev.target.value.length < 3) {
      this.data = {
        ...this.data,
        day: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 1 && ev.target.value.length < 3) {
      this.data = {
        ...this.data,
        month: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 2) {
      this.data = {
        ...this.data,
        year: ev.target.value.length === 4 ? ev.target.value : this.data.year,
      };
    }
    ev.target.value = Object.values(this.data)[key];
  }

  render() {
    return (
      <Host>
        {this.text.length ? <span>{this.text}</span> : null}
        <div class="input-wrapper">
          <input min="1" max="31" type="number" name="day" placeholder="JJ" value={this.data.day} onChange={ev => this.handleChange(ev, 0)} />
          <div class="line" />
          <input min="1" max="12" type="number" name="month" placeholder="MM" value={this.data.month} onChange={ev => this.handleChange(ev, 1)} />
          <div class="line" />
          <input min="0" max="3000" type="number" name="year" placeholder="AAAA" value={this.data.year} onChange={ev => this.handleChange(ev, 2)} />
        </div>
        <slot></slot>
      </Host>
    );
  }
}
