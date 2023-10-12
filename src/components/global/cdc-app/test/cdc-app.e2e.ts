import { newE2EPage } from '@stencil/core/testing';

describe('cdc-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cdc-app></cdc-app>');

    const element = await page.find('cdc-app');
    expect(element).toHaveClass('hydrated');
  });
});
