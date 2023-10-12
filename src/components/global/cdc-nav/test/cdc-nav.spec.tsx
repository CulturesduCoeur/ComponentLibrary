import { newSpecPage } from '@stencil/core/testing';
import { CdcNav } from '../cdc-nav';

describe('cdc-nav', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdcNav],
      html: `<cdc-nav></cdc-nav>`,
    });
    expect(page.root).toEqualHtml(`
      <cdc-nav>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cdc-nav>
    `);
  });
});
