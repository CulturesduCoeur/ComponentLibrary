import { Component, Element, Watch, Prop, h } from '@stencil/core';

@Component({
  tag: 'attr-injector',
})
export class AttrInjector {
  @Element() el: HTMLElement;
  childEl: HTMLElement;

  @Prop() attrs: any = {};

  componentWillLoad() {
    this.childEl = this.el.firstElementChild as HTMLElement;
    this.injectAttrs();
  }

  @Watch('attrs')
  attrsUpdated() {
    this.injectAttrs();
  }

  injectAttrs() {
    for (let [key, value] of Object.entries(this.attrs)) {
      this.childEl.setAttribute(key, value as string);
    }
  }

  render() {
    return (
      <div class="attr-injector">
        <slot />
      </div>
    );
  }
}
