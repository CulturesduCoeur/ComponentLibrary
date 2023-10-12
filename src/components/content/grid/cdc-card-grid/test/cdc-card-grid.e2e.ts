import { newE2EPage } from '@stencil/core/testing';

describe('cdc-card-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cdc-card-grid></cdc-card-grid>');

    const element = await page.find('cdc-card-grid');
    expect(element).toHaveClass('hydrated');
  });
});
