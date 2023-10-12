import { newE2EPage } from '@stencil/core/testing';

describe('cdc-nav', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cdc-nav></cdc-nav>');

    const element = await page.find('cdc-nav');
    expect(element).toHaveClass('hydrated');
  });
});
