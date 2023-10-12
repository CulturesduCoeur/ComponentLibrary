import { Component, Host, h, State, Element, Watch, Prop } from '@stencil/core';
import { TimePickerValue } from '../../../../assets/interface/timepicker.interface';

@Component({
  tag: 'cdc-time-picker',
  styleUrl: 'cdc-time-picker.css',
  shadow: true,
})
export class CdcTimePicker {
  @Element() el: HTMLElement;
  private childEl: HTMLInputElement;
  @State() data: TimePickerValue = {
    hours: '',
    minutes: '',
  };
  @Prop() text: string = '';

  componentWillLoad() {
    this.childEl = this.el.firstElementChild as HTMLInputElement;
    if (this.childEl.value.length) {
      this.data = {
        hours: this.childEl.value.substring(0, 2),
        minutes: this.childEl.value.substring(3, 5),
      };
    }
    this.childEl.addEventListener('change', ev => this.handleInputChange(ev));
  }

  @Watch('data')
  handleDataChange(newValue: TimePickerValue) {
    const { hours, minutes } = newValue;
    if (hours.length && minutes.length) this.childEl.value = `${hours}:${minutes}`;
  }

  handleInputChange(ev) {
    if (ev.target.value.length) {
      this.data = {
        hours: this.childEl.value.substring(0, 2),
        minutes: this.childEl.value.substring(3, 5),
      };
    } else {
      this.data = {
        hours: '',
        minutes: '',
      };
    }
  }

  handleChange(ev, key) {
    if (key === 0 && ev.target.value.length < 3) {
      this.data = {
        ...this.data,
        hours: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 1 && ev.target.value.length < 3) {
      this.data = {
        ...this.data,
        minutes: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }
    ev.target.value = Object.values(this.data)[key];
  }

  render() {
    return (
      <Host>
        {this.text.length ? <span>{this.text}</span> : null}
        <div class="input-wrapper">
          <input min="1" max="31" type="number" name="hours" placeholder="HH" value={this.data.hours} onChange={ev => this.handleChange(ev, 0)} />
          <p> : </p>
          <input min="1" max="12" type="number" name="minutes" placeholder="MM" value={this.data.minutes} onChange={ev => this.handleChange(ev, 1)} />
        </div>
        <slot></slot>
      </Host>
    );
  }
}
