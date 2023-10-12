import { newE2EPage } from '@stencil/core/testing';

describe('cdc-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cdc-header></cdc-header>');

    const element = await page.find('cdc-header');
    expect(element).toHaveClass('hydrated');
  });
});
