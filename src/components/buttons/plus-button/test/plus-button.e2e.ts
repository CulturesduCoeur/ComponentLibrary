import { newE2EPage } from '@stencil/core/testing';

describe('plus-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<plus-button></plus-button>');

    const element = await page.find('plus-button');
    expect(element).toHaveClass('hydrated');
  });
});
