import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { TimePickerValue } from '../../../../assets/interface/timepicker.interface';

const timeNull: TimePickerValue = {
  hours: '',
  minutes: '',
};

@Component({
  tag: 'cdc-timetable-picker',
  styleUrl: 'cdc-timetable-picker.css',
  shadow: true,
})
export class CdcTimetablePicker {
  @Element() el: HTMLElement;
  private beginEl: HTMLInputElement;
  private endEl: HTMLInputElement;
  @State() dataBegin: TimePickerValue = timeNull;
  @State() dataEnd: TimePickerValue = timeNull;

  @Prop() begin: string = '';
  @Prop() end: string = '';

  componentWillLoad() {
    this.beginEl = this.el.firstElementChild as HTMLInputElement;
    this.endEl = this.el.lastElementChild as HTMLInputElement;

    if (this.beginEl.value?.length) {
      this.dataBegin = {
        hours: this.beginEl.value.substring(0, 2),
        minutes: this.beginEl.value.substring(3, 5),
      };
    }
    if (this.endEl.value?.length) {
      this.dataEnd = {
        hours: this.endEl.value.substring(0, 2),
        minutes: this.endEl.value.substring(3, 5),
      };
    }
    this.beginEl.addEventListener('change', ev => this.handleInputChange(ev, 0));
    this.endEl.addEventListener('change', ev => this.handleInputChange(ev, 1));
  }

  @Watch('dataBegin')
  handleDataBeginChange(newValue: TimePickerValue) {
    const { hours, minutes } = newValue;
    if (hours.length && minutes.length) this.beginEl.value = `${hours}:${minutes}`;
  }
  @Watch('dataEnd')
  handleDataEndChange(newValue: TimePickerValue) {
    const { hours, minutes } = newValue;
    if (hours.length && minutes.length) this.endEl.value = `${hours}:${minutes}`;
  }

  handleInputChange(ev, key) {
    if (ev.target.value.length) {
      if (key === 0)
        this.dataBegin = {
          hours: ev.target.value.substring(0, 2),
          minutes: ev.target.value.substring(3, 5),
        };
      else {
        this.dataEnd = {
          hours: ev.target.value.substring(0, 2),
          minutes: ev.target.value.substring(3, 5),
        };
      }
    } else {
      this.dataBegin = {
        hours: '',
        minutes: '',
      };
      this.dataEnd = {
        hours: '',
        minutes: '',
      };
    }
  }

  handleChange(ev, key) {
    if (key === 0 && ev.target.value.length < 3) {
      this.dataBegin = {
        ...this.dataBegin,
        hours: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 1 && ev.target.value.length < 3) {
      this.dataBegin = {
        ...this.dataBegin,
        minutes: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }
    if (key === 2 && ev.target.value.length < 3) {
      this.dataEnd = {
        ...this.dataEnd,
        hours: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    } else if (key === 3 && ev.target.value.length < 3) {
      this.dataEnd = {
        ...this.dataEnd,
        minutes: ev.target.value.length >= 2 ? ev.target.value : '0' + ev.target.value,
      };
    }
    if (key < 2) ev.target.value = Object.values(this.dataBegin)[key];
    else ev.target.value = Object.values(this.dataEnd)[key - 2];
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
            <input min="1" max="31" type="number" name="hours" placeholder="HH" value={this.dataBegin.hours} onChange={ev => this.handleChange(ev, 0)} />
            <p> : </p>
            <input min="1" max="12" type="number" name="minutes" placeholder="MM" value={this.dataBegin.minutes} onChange={ev => this.handleChange(ev, 1)} />
          </div>
          <div class="separator" />
          <div class="input-wrapper">
            <input min="1" max="31" type="number" name="hours2" placeholder="HH" value={this.dataEnd.hours} onChange={ev => this.handleChange(ev, 2)} />
            <p> : </p>
            <input min="1" max="12" type="number" name="minutes2" placeholder="MM" value={this.dataEnd.minutes} onChange={ev => this.handleChange(ev, 3)} />
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
