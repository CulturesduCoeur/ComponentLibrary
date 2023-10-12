import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { DatePickerValue } from '../../../../assets/interface/datepicker.interface';

const dateNull: DatePickerValue = {
  day: '',
  month: '',
  year: '',
};

@Component({
  tag: 'cdc-period-picker',
  styleUrl: 'cdc-period-picker.css',
  shadow: true,
})
export class CdcPeriodPicker {
  @Element() el: HTMLElement;
  private beginEl: HTMLInputElement;
  private endEl: HTMLInputElement;
  @State() dataBegin: DatePickerValue = dateNull;
  @State() dataEnd: DatePickerValue = dateNull;
  @Prop() begin: string = '';
  @Prop() end: string = '';

  componentWillLoad() {
    this.beginEl = this.el.firstElementChild as HTMLInputElement;
    this.endEl = this.el.lastElementChild as HTMLInputElement;

    if (this.beginEl.value?.length) {
      this.dataBegin = {
        day: this.beginEl.value.substring(8, 10),
        month: this.beginEl.value.substring(5, 7),
        year: this.beginEl.value.substring(0, 4),
      };
    }
    if (this.endEl.value?.length) {
      this.dataEnd = {
        day: this.endEl.value.substring(8, 10),
        month: this.endEl.value.substring(5, 7),
        year: this.endEl.value.substring(0, 4),
      };
    }
    this.beginEl.addEventListener('change', ev => this.handleInputChange(ev, 0));
    this.endEl.addEventListener('change', ev => this.handleInputChange(ev, 1));
  }

  @Watch('dataBegin')
  handleDataBeginChange(newValue: DatePickerValue) {
    const { day, month, year } = newValue;
    if (day.length && month.length && year.length) this.beginEl.value = `${year}-${month}-${day}`;
  }
  @Watch('dataEnd')
  handleDataEndChange(newValue: DatePickerValue) {
    const { day, month, year } = newValue;
    if (day.length && month.length && year.length) this.endEl.value = `${year}-${month}-${day}`;
  }

  handleInputChange(ev, key) {
    if (ev.target.value.length) {
      if (key === 0)
        this.dataBegin = {
          day: ev.target.value.substring(8, 10),
          month: ev.target.value.substring(5, 7),
          year: ev.target.value.substring(0, 4),
        };
      else {
        this.dataEnd = {
          day: ev.target.value.substring(8, 10),
          month: ev.target.value.substring(5, 7),
          year: ev.target.value.substring(0, 4),
        };
      }
    } else {
      this.dataBegin = {
        day: '',
        month: '',
        year: '',
      };
      this.dataEnd = {
        day: '',
        month: '',
        year: '',
      };
    }
  }

  handleChange(ev, key) {
    if (key === 0 && ev.target.value.length < 3) {
      this.dataBegin = {
        ...this.dataBegin,
        day: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 1 && ev.target.value.length < 3) {
      this.dataBegin = {
        ...this.dataBegin,
        month: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }
    if (key === 2) {
      this.dataBegin = {
        ...this.dataBegin,
        year: ev.target.value.length === 4 ? ev.target.value : this.dataBegin.year,
      };
    } else if (key === 3 && ev.target.value.length < 3) {
      this.dataEnd = {
        ...this.dataEnd,
        day: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }
    if (key === 4 && ev.target.value.length < 3) {
      this.dataEnd = {
        ...this.dataEnd,
        month: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 5) {
      this.dataEnd = {
        ...this.dataEnd,
        year: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }

    if (key < 3) ev.target.value = Object.values(this.dataBegin)[key];
    else ev.target.value = Object.values(this.dataEnd)[key - 3];
  }

  render() {
    return (
      <Host>
        <div class="text-wrapper">
          <span>{this.begin}</span>
          <span>{this.end}</span>
        </div>
        <div class="content-wrapper">
          <div class="input-wrapper">
            <input min="1" max="31" type="number" name="day" placeholder="JJ" value={this.dataBegin.day} onChange={ev => this.handleChange(ev, 0)} />
            <div class="line" />
            <input min="1" max="12" type="number" name="month" placeholder="MM" value={this.dataBegin.month} onChange={ev => this.handleChange(ev, 1)} />
            <div class="line" />
            <input class="year" min="0" max="3000" type="number" name="year" placeholder="AAAA" value={this.dataBegin.year} onChange={ev => this.handleChange(ev, 2)} />
          </div>
          <div class="separator" />
          <div class="input-wrapper">
            <input min="1" max="31" type="number" name="day" placeholder="JJ" value={this.dataEnd.day} onChange={ev => this.handleChange(ev, 3)} />
            <div class="line" />
            <input min="1" max="12" type="number" name="month" placeholder="MM" value={this.dataEnd.month} onChange={ev => this.handleChange(ev, 4)} />
            <div class="line" />
            <input class="year" min="0" max="3000" type="number" name="year" placeholder="AAAA" value={this.dataEnd.year} onChange={ev => this.handleChange(ev, 5)} />
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
