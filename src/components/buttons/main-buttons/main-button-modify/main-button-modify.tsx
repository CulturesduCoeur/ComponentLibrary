import { Component, Host, h, Prop, State, Element, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'main-button-modify',
  styleUrl: 'main-button-modify.css',
  shadow: true,
})
export class MainButtonModify {
  @Element() el: HTMLElement;
  private deleteButton: HTMLElement;
  private wrapperButton: HTMLElement;
  private textWrapper: HTMLElement;

  /* State Globaux */
  @State() delete: boolean = false;
  @State() isSelected: boolean = false;
  @State() loading: boolean = false;
  /* State de position */
  @State() mouseInitialPos: number;
  @State() buttonInitialPos: number;
  @Prop() color: string = '#009ee1';
  @Event({ eventName: 'delete' }) deleteEvent: EventEmitter<boolean>;
  @Event({ eventName: 'modify' }) modifyEvent: EventEmitter<boolean>;

  @Listen('click', { target: 'window' })
  handleClick(ev) {
    if (ev.target instanceof HTMLElement && !this.el.contains(ev.target) && this.delete && !this.isSelected) {
      this.delete = false;
    }
    if (this.isSelected) {
      this.handleEnd(false);
    }
  }

  @Listen('mousemove', { target: 'document' })
  handleDrag(ev) {
    if (this.isSelected) {
      const mouseX = ev.clientX; // position de la souris
      const delta = mouseX - this.mouseInitialPos; // mouvement de la souris depuis le clique
      const buttonX = this.deleteButton.getBoundingClientRect().x; // position du bouton
      const wrapperX = this.el.getBoundingClientRect().x; // position du wrapper
      // S'occupe de faire réagir les élèments d'interface au drag
      if (buttonX + delta < this.buttonInitialPos + 50) {
        this.deleteButton.style.transform = `translate3d(${delta / 2}px, 0, 0)`;
        this.wrapperButton.style.background = `rgba(211, 211, 221, ${1 - this.remap(buttonX, this.buttonInitialPos, wrapperX)})`;
        this.textWrapper.style.opacity = `${1 - this.remap(buttonX, this.buttonInitialPos, wrapperX)}`;
      } else {
        this.handleEnd(false);
      }
      // L'utilisateur est allé jusqu'au bout l'evenement de suppression est lancé
      if (wrapperX - buttonX >= 0) {
        this.deleteEvent.emit(true);
        this.handleEnd(true);
      }
      // Gere les imprecisions de la souris ou des mouvement involontaire qui peuvent conduire à des suppressions
      if (ev.clientY < this.el.getBoundingClientRect().y - 75 || ev.clientY > this.el.getBoundingClientRect().y + 75) {
        this.handleEnd(false);
      }
    }
  }

  handleModify = () => {
    this.modifyEvent.emit(true);
  };

  remap = (value, sourceMin, sourceMax, destMin = 0, destMax = 1) => destMin + ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin);

  handleDelete() {
    if (this.delete !== true) {
      this.delete = true;
    }
  }

  handleEnd(stopDelete: boolean) {
    if (stopDelete) {
      this.loading = true;
      this.delete = false;
      this.wrapperButton.style.transition = '0.4s ease-in-out';
      this.wrapperButton.style.background = this.color;
      this.textWrapper.style.opacity = '1';
    }
    this.isSelected = false;
    this.deleteButton.style.transition = '0.4s ease-in-out';
    this.deleteButton.style.cursor = 'pointer';
    this.deleteButton.style.transform = 'none';
    this.wrapperButton.style.transition = '0.4s ease-in-out';
    this.wrapperButton.style.background = 'lightgrey';
    this.textWrapper.style.opacity = '1';
  }

  handleMouseDown(evt) {
    if (this.delete) {
      this.isSelected = true;
      this.deleteButton.style.cursor = 'grabbing';
      this.deleteButton.style.transition = 'none';
      this.wrapperButton.style.transition = 'none';
      this.mouseInitialPos = evt.clientX;
      this.buttonInitialPos = this.deleteButton.getBoundingClientRect().x;
    }
  }

  render() {
    return (
      <Host>
        <div class="cdc-main-button" style={{ background: this.delete ? 'lightgrey' : this.color }} ref={el => (this.wrapperButton = el as HTMLElement)}>
          {/* Modify Icons */}
          <div style={{ opacity: this.delete ? '0' : '1' }} onClick={this.handleModify}>
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.8454 2.05597C19.5215 1.37984 20.4385 1 21.3947 1C22.3509 1 23.2679 1.37984 23.944 2.05597C24.6202 2.7321 25 3.64912 25 4.60531C25 5.56149 24.6202 6.47852 23.944 7.15464L7.79823 23.3004L1 25L2.69956 18.2018L18.8454 2.05597Z"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          {/* Delete Icons */}
          <div
            ref={el => (this.deleteButton = el as HTMLElement)}
            class={`delete-button ${this.delete ? 'active' : null}`}
            onClick={() => this.handleDelete()}
            // onMouseEnter={evt => this.handleMouseDown(evt)}
            onMouseDown={evt => this.handleMouseDown(evt)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M10 11V17" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 11V17" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div class="text-wrapper" ref={el => (this.textWrapper = el as HTMLElement)}>
          {!this.delete ? <slot name="description-text" /> : <slot name="delete-text" />}
        </div>
      </Host>
    );
  }
}
