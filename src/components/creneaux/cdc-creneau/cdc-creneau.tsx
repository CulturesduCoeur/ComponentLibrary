import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'cdc-creneau',
  styleUrl: 'cdc-creneau.css',
  shadow: true,
})
export class CdcCreneau {
  // @State() selected: boolean = false;

  @Prop() deletable: boolean = false;
  @Prop() selectable: boolean = true;
  @Prop({ mutable: true }) selected: boolean = false;
  @Prop() reservation: boolean = false;
  @Prop() creneauid: string = '';
  @Event({ eventName: 'deletecreneau' }) deleteCreneau: EventEmitter<{ id: string }>;
  @Event({ eventName: 'selectcreneau' }) selectCreneau: EventEmitter<{ state: boolean; id: string }>;

  handleDelete() {
    this.deleteCreneau.emit({ id: this.creneauid });
  }

  handleSelected() {
    this.selectCreneau.emit({ state: this.selected, id: this.creneauid });
  }

  render() {
    return (
      <Host>
        <div class={`creneau ${this.selected ? 'selected' : null}`}>
          {this.selected ? (
            <div class="right-button selected" onClick={() => this.handleSelected()}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="17" x2="32" y2="17" stroke="#404040" stroke-width="6" stroke-linecap="round" />
                <line x1="17.5" y1="32" x2="17.5" y2="3" stroke="#404040" stroke-width="6" stroke-linecap="round" />
              </svg>
            </div>
          ) : this.deletable ? (
            <div class="right-button delete" onClick={() => this.handleDelete()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="#e31515" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="#e31515"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M10 11V17" stroke="#e31515" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 11V17" stroke="#e31515" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          ) : null}
          <div class="content" onClick={this.selectable ? () => this.handleSelected() : null}>
            <slot name="date"></slot>
            <slot name="hours"></slot>
            <div class="seats-row">
              {this.reservation ? (
                <div class="reservation-wrapper">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5"
                      stroke="#F37958"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 5.5C7.10457 5.5 8 4.60457 8 3.5C8 2.39543 7.10457 1.5 6 1.5C4.89543 1.5 4 2.39543 4 3.5C4 4.60457 4.89543 5.5 6 5.5Z"
                      stroke="#F37958"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <slot name="reservation" />
                </div>
              ) : (
                <div class="reservation-wrapper" style={{ width: '5em' }}></div>
              )}

              <div class="total-seats-wrapper">
                <slot name="seats" />
                <p>places</p>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
