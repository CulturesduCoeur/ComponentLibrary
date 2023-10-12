import { newSpecPage } from '@stencil/core/testing';
import { CdcImageUpload } from '../cdc-image-upload';

describe('cdc-image-upload', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdcImageUpload],
      html: `<cdc-image-upload></cdc-image-upload>`,
    });
    expect(page.root).toEqualHtml(`
      <cdc-image-upload>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cdc-image-upload>
    `);
  });
});
