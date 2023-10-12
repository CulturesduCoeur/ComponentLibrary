import { newSpecPage } from '@stencil/core/testing';
import { CdcApp } from '../cdc-app';

describe('cdc-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdcApp],
      html: `<cdc-app></cdc-app>`,
    });
    expect(page.root).toEqualHtml(`
      <cdc-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cdc-app>
    `);
  });
});
