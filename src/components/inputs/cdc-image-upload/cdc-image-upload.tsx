import { Component, Host, h, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'cdc-image-upload',
  styleUrl: 'cdc-image-upload.css',
})
export class CdcImageUpload {
  textInput!: HTMLInputElement;
  @State() internalImg: any = '';
  @Prop() name: string = 'image';
  @Prop() img: string;
  @Prop() placeholder: string = 'Chosir une image';

  @Watch('img')
  handleExternalImage(newValue) {
    this.internalImg = newValue;
  }

  componentWillLoad() {
    if (this.img?.length) {
      this.internalImg = this.img;
    }
  }
  componentDidLoad() {
    this.textInput.name = this.name;
    this.textInput.addEventListener('change', this.handleImage);
  }

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  handleImage = async evt => {
    const file = evt.target.files[0];
    this.internalImg = await this.toBase64(file);
  };

  render() {
    return (
      <Host>
        <div class="image-upload-wrapper">
          <p class={this.internalImg.length ? 'passive' : 'active'}>{this.internalImg.length ? 'Changer' : this.placeholder}</p>
          <input type="file" accept="image/*" id="IUinput" ref={el => (this.textInput = el as HTMLInputElement)} />
          <img style={{ opacity: this.internalImg.length ? '1' : '0' }} src={this.internalImg} />
        </div>
      </Host>
    );
  }
}
