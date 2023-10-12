import { Component, h, Prop } from '@stencil/core';

import Pin from './../../../../assets/svg/Pin.svg';
import Calendar from './../../../../assets/svg/Calendar.svg';
import People from './../../../../assets/svg/People.svg';

@Component({
  tag: 'cdc-card-events',
  styleUrl: 'cdc-card-events.css',
  shadow: false,
})
export class CdcCardEvents {
  @Prop() href: string;
  @Prop() img: string;
  @Prop() cardtitle: string;
  @Prop() categorie: string;
  @Prop() localisation: string;
  @Prop() date: string;
  @Prop() peoples: string;

  render() {
    return (
      <a href={this.href}>
        <div class="card-wrapper">
          <img class="main-img" src={this.img} alt="" />
          <div class="desc-part">
            <h2>{this.cardtitle}</h2>
            <p>{this.categorie}</p>
            <div class="row">
              <img src={Pin} alt="" />
              <span>{this.localisation}</span>
            </div>
            <div class="row">
              <img src={Calendar} alt="" />
              <span>{this.date}</span>
            </div>
            <div class="row">
              <img src={People} alt="" />
              <span>{this.peoples} pers. max par session</span>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
