import { newSpecPage } from '@stencil/core/testing';
import { PlusButton } from '../plus-button';

describe('plus-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PlusButton],
      html: `<plus-button></plus-button>`,
    });
    expect(page.root).toEqualHtml(`
      <plus-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </plus-button>
    `);
  });
});
