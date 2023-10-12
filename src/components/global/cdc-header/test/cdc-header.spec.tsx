import { newSpecPage } from '@stencil/core/testing';
import { CdcHeader } from '../cdc-header';

describe('cdc-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdcHeader],
      html: `<cdc-header></cdc-header>`,
    });
    expect(page.root).toEqualHtml(`
      <cdc-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cdc-header>
    `);
  });
});
