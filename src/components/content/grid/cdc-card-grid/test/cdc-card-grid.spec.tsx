import { newSpecPage } from '@stencil/core/testing';
import { CdcCardGrid } from '../cdc-card-grid';

describe('cdc-card-grid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdcCardGrid],
      html: `<cdc-card-grid></cdc-card-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <cdc-card-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cdc-card-grid>
    `);
  });
});
