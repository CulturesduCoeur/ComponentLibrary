import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'cdc-card-activity',
  styleUrl: 'cdc-card-activity.css',
  shadow: false,
})
export class CdcCardActivity {
  @Prop() href: string;
  @Prop() img: string;
  @Prop() cardtitle: string;
  @Prop() categorie: string;
  @Prop() localisation: string;
  @Prop() start: string;
  @Prop() end: string;
  @Prop() peoples: string;

  render() {
    return (
      <a href={this.href}>
        <div class="card-wrapper">
          <img class="main-img" src={this.img} alt="" />
          <div class="desc-part">
            <h2>{this.cardtitle}</h2>
            <p>{this.categorie}</p>
          </div>
        </div>
      </a>
    );
  }
}
