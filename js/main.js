/**
 * @module stack-l
 * @description
 * A custom element for injecting white space (margin) between flow 
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */
class Stack extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Stack-${[this.space, this.recursive, this.splitAfter].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"]${this.recursive ? '' : ' >'} * + * {
            margin-top: ${this.space};
          }
      
          ${this.splitAfter ? `
            [data-i="${this.i}"]:only-child {
              height: 100%;
            }
      
            [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
              margin-bottom: auto;
            }`
          : ''}
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get recursive() {
    return this.hasAttribute('recursive');
  }

  set recursive(val) {
    return this.setAttribute(val ? 'recursive' : '');
  }

  get splitAfter() {
    return this.getAttribute('splitAfter') || null;
  }

  set splitAfter(val) {
    return this.setAttribute('splitAfter', val);
  }

  static get observedAttributes() {
    return ['space', 'recursive', 'splitAfter'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('stack-l', Stack);
}

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
class Box extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Box-${[this.padding, this.borderWidth, this.invert].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            padding: ${this.padding};
            border: ${this.borderWidth} solid;
            ${this.invert ?
            `background-color: var(--color-light);
              filter: invert(100%);`
            : ''}
          }
      
          [data-i="${this.i}"] {
            background-color: inherit;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s1)';
  }

  set padding(val) {
    return this.setAttribute('padding', val);
  }

  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)';
  }

  set borderWidth(val) {
    return this.setAttribute('borderWidth', val);
  }

  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert'];
  }

  get invert() {
    return this.hasAttribute('invert');
  }

  set invert(val) {
    if (val) {
      return this.setAttribute('invert', '');
    } else {
      return this.removeAttribute('invert');
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('box-l', Box);
}

/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
class Center extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Center-${[this.max, this.andText, this.gutters, this.intrinsic].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            max-width: ${this.max};
            ${this.gutters ? `
            padding-left: ${this.gutters};
            padding-right: ${this.gutters};`
            : ''}
            ${this.andText ? `text-align: center;` : ''}
            ${this.intrinsic ? `
            display: flex;
            flex-direction: column;
            align-items: center;`
            : ''}
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get max() {
    return this.getAttribute('max') || 'var(--measure)';
  }

  set max(val) {
    return this.setAttribute('max', val);
  }

  get andText() {
    return this.hasAttribute('andText');
  }

  set andText(val) {
    if (val) {
      return this.setAttribute('andText', '');
    } else {
      return this.removeAttribute('andText');
    }
  }

  get gutters() {
    return this.getAttribute('gutters') || null;
  }

  set gutters(val) {
    return this.setAttribute('gutters', val);
  }

  get intrinsic() {
    return this.hasAttribute('intrinsic');
  }

  set intrinsic(val) {
    if (val) {
      return this.setAttribute('intrinsic', '');
    } else {
      return this.removeAttribute('intrinsic');
    }
  }

  static get observedAttributes() {
    return ['max', 'andText', 'gutters', 'intrinsic'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('center-l', Center);
}

/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=flex-start A CSS `justify-content` value
  display: block;
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--measure);
   * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
}

*/

class Cluster extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cluster-${[this.justify, this.align, this.space].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            justify-content: ${this.justify};
            align-items: ${this.align};
            gap: ${this.space};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get justify() {
    return this.getAttribute('justify') || 'flex-start';
  }

  set justify(val) {
    return this.setAttribute('justify', val);
  }

  get align() {
    return this.getAttribute('align') || 'flex-start';
  }

  set align(val) {
    return this.setAttribute('align', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  static get observedAttributes() {
    return ['justify', 'align', 'space'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cluster-l', Cluster);
}

/**
 * @module sidebar-l
 * @description
 * A custom element for placing two elements side-by-side. If space permits, the sidebar element has a set width, and the companion takes up the rest of the available horizontal space. If not, the elements are collapsed into a single column, each taking up 100% of the horizontal space.
 * @property {string} side=left Which element to treat as the sidebar (all values but "left" are considered "right")
 * @property {string} sideWidth Represents the width of the sidebar _when_ adjacent. If not set (`null`) it defaults to the sidebar's content width
 * @property {string} contentMin=50% A CSS **percentage** value. The minimum width of the content element in the horizontal configuration
 * @property {string} space=var(--s1) A CSS margin value representing the space between the two elements
 * @property {boolean} noStretch=false Make the adjacent elements adopt their natural height
 */
class Sidebar extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if (!this.contentMin.includes('%')) {
        console.warn('The value for each <sidebar-l> `contentMin` property should be a percentage. Otherwise overflow is likely to occur');
      }
      this.i = `Sidebar-${[this.side, this.sideWidth, this.contentMin, this.space].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            gap: ${this.space};
            ${this.noStretch ? 'align-items: flex-start;' : ''}
          }
      
          [data-i="${this.i}"] > * {
            ${this.sideWidth ? `flex-basis: ${this.sideWidth};` : ''}
          }
      
          [data-i="${this.i}"] > ${this.side !== 'left' ? `:first-child` : `:last-child`} {
            flex-basis: 0;
            flex-grow: 999;
            min-width: ${this.contentMin};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get side() {
    return this.getAttribute('side') || 'left';
  }

  set side(val) {
    return this.setAttribute('side', val);
  }

  get sideWidth() {
    return this.getAttribute('sideWidth') || null;
  }

  set sideWidth(val) {
    return this.setAttribute('sideWidth', val);
  }

  get contentMin() {
    return this.getAttribute('contentMin') || '50%';
  }

  set contentMin(val) {
    return this.setAttribute('contentMin', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get noStretch() {
    return this.hasAttribute('noStretch');
  }

  set noStretch(val) {
    if (val) {
      this.setAttribute('noStretch', '');
    } else {
      this.removeAttribute('noStretch');
    }
  }

  static get observedAttributes() {
    return ['side', 'sideWidth', 'contentMin', 'space', 'noStretch'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name) {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('sidebar-l', Sidebar);
}

/**
 * @module switcher-l
 * @description Switch directly between horizontal and vertical layouts at a given (container width-based) breakpoint or 'threshold'
 * @property {string} threshold=var(--measure) A CSS `width` value (representing the 'container breakpoint')
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {integer} limit=4 A number representing the maximum number of items permitted for a horizontal layout
 */
class Switcher extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Switcher-${[this.threshold, this.space, this.limit].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            gap: ${this.space};
          }

          [data-i="${this.i}"] > * {
            flex-basis: calc((${this.threshold} - 100%) * 999);
          }

          [data-i="${this.i}"] > :nth-last-child(n+${parseInt(this.limit) + 1}),
          [data-i="${this.i}"] > :nth-last-child(n+${parseInt(this.limit) + 1}) ~ * {
            flex-basis: 100%;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }
  get threshold() {
    return this.getAttribute('threshold') || 'var(--measure)';
  }

  set threshold(val) {
    return this.setAttribute('threshold', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get limit() {
    return this.getAttribute('limit') || '5';
  }

  set limit(val) {
    return this.getAttribute('limit', val);
  }

  static get observedAttributes() {
    return ['threshold', 'space', 'limit'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  
  customElements.define('switcher-l', Switcher);
}

/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
class Cover extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cover-${[this.centered, this.space, this.minHeight, this.noPad].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${!this.noPad ? this.space : '0'};
          }
      
          [data-i="${this.i}"] > * {
            margin-top: ${this.space};
            margin-bottom: ${this.space};
          }
      
          [data-i="${this.i}"] > :first-child:not(${this.centered}) {
            margin-top: 0;
          }
      
          [data-i="${this.i}"] > :last-child:not(${this.centered}) {
            margin-bottom: 0;
          }
      
          [data-i="${this.i}"] > ${this.centered} {
            margin-top: auto;
            margin-bottom: auto;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get centered() {
    return this.getAttribute('centered') || 'h1';
  }

  set centered(val) {
    return this.setAttribute('centered', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get minHeight() {
    return this.getAttribute('minHeight') || '100vh';
  }

  set minHeight(val) {
    return this.setAttribute('minHeight', val);
  }

  get noPad() {
    return this.hasAttribute('noPad');
  }

  set noPad(val) {
    if (val) {
      return this.setAttribute('noPad', '');
    } else {
      return this.removeAttribute('noPad');
    }
  }

  static get observedAttributes() {
    return ['centered', 'space', 'minHeight', 'noPad'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cover-l', Cover);
}

// Utils
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}