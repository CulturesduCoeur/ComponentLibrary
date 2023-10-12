import { Component, Host, h, Prop, Event, State, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'page-selector',
  styleUrl: 'page-selector.css',
  shadow: true,
})
export class PageSelector {
  @Prop() numberofpages: number = 1;
  @Prop() gotopage: number = 1;
  @State() currentPage: number = 1;
  @State() numberofPagesArray: Array<any> = [];
  @Event({ eventName: 'tablegotopage' }) tableGoToPage: EventEmitter<number>;

  componentWillLoad() {
    if (this.numberofpages <= 0 || isNaN(this.numberofpages)) this.numberofpages = 1;
    this.numberofPagesArray = Array.from(Array(this.numberofpages).keys());
    if (this.gotopage > this.numberofpages) this.currentPage = 1;
    else this.currentPage = this.gotopage;
  }

  @Watch('gotopage')
  handlePropChange(newValue) {
    this.currentPage = newValue;
    console.log(this.currentPage);
  }

  @Watch('numberofpages')
  handlenumberOfPages(newValue) {
    console.log(Array.from(Array(newValue).keys()));
    this.numberofPagesArray = Array.from(Array(this.numberofpages).keys());
  }

  handlePageChange(index: number) {
    if (index < 0 || index > this.numberofpages) return;
    this.currentPage = index as number;
    this.tableGoToPage.emit(index);
  }

  handleInput(ev) {
    ev.preventDefault();
    const index: number = parseInt(ev.target.value);
    this.handlePageChange(index);
  }

  render() {
    return (
      <Host>
        <div class="pages-wrapper">
          {this.currentPage > 1 && this.numberofpages > 5 ? (
            <button class="prev" onClick={() => this.handlePageChange(this.currentPage - 1)}>
              <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7373 14.5957L27.3322 2.00083" stroke="#404040" stroke-width="2" stroke-linecap="round" />
                <path d="M2.00002 2.06445L14.5949 14.6593" stroke="#404040" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          ) : null}
          {this.numberofpages <= 5 ? (
            <div>
              {this.numberofPagesArray.map(el => (
                <h2 onClick={() => this.handlePageChange(el + 1)} class={`${this.currentPage === el + 1 ? 'active' : null}`}>
                  {el + 1}
                </h2>
              ))}
            </div>
          ) : this.currentPage <= 2 ? (
            <div>
              <h2 onClick={() => this.handlePageChange(1)} class={`${this.currentPage === 1 ? 'active' : null}`}>
                1
              </h2>
              <h2 onClick={() => this.handlePageChange(2)} class={`${this.currentPage === 2 ? 'active' : null}`}>
                2
              </h2>
              <h2 onClick={() => this.handlePageChange(3)}>3</h2>
              <p>...</p>
              <h2 onClick={() => this.handlePageChange(this.numberofpages)}>{this.numberofpages}</h2>
            </div>
          ) : this.currentPage >= this.numberofpages - 1 ? (
            <div>
              <h2 onClick={() => this.handlePageChange(1)}>1</h2>
              <p>...</p>
              <h2 onClick={() => this.handlePageChange(this.numberofpages - 2)}>{this.numberofpages - 2}</h2>
              <h2 onClick={() => this.handlePageChange(this.numberofpages - 1)} class={`${this.currentPage === this.numberofpages - 1 ? 'active' : null}`}>
                {this.numberofpages - 1}
              </h2>
              <h2 onClick={() => this.handlePageChange(this.numberofpages)} class={`${this.currentPage === this.numberofpages ? 'active' : null}`}>
                {this.numberofpages}
              </h2>
            </div>
          ) : (
            <div>
              <h2 onClick={() => this.handlePageChange(1)}>1</h2>
              <p>..</p>
              <h2 onClick={() => this.handlePageChange(this.currentPage - 1)}>{(this.currentPage as number) - 1}</h2>
              <h2 class="active">{this.currentPage}</h2>
              <h2 onClick={() => this.handlePageChange(this.currentPage + 1)}>{((this.currentPage as number) + 1) as number}</h2>
              <p>..</p>
              <h2 onClick={() => this.handlePageChange(this.numberofpages)}>{this.numberofpages}</h2>
            </div>
          )}
          {this.currentPage < this.numberofpages && this.numberofpages > 5 ? (
            <button class="next" onClick={() => this.handlePageChange(this.currentPage + 1)}>
              <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7373 14.5957L27.3322 2.00083" stroke="#404040" stroke-width="2" stroke-linecap="round" />
                <path d="M2.00002 2.06445L14.5949 14.6593" stroke="#404040" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          ) : null}
        </div>

        <div class="goToPage-wrapper">
          <p>Aller à la page: </p>
          <input type="number" name="pageWanted" value="" onChange={ev => this.handleInput(ev)} />
        </div>
      </Host>
    );
  }
}
