import { Component } from '../../../core/Component';
import './style.css';

export class Logo extends Component {
    constructor() {
        super();
    }

    render(): string {
        return `
            <a href="#/" class="a-logo">
                <svg viewBox="0 0 647 641" version="1.1" xmlns="http://www.w3.org/2000/svg" class="inograf-svg">
                    <g transform="matrix(1,0,0,1,-1654.61,0)">
                        <g transform="matrix(0.916963,0,0,0.969453,156.234,1658.66)">
                            <g transform="matrix(8.82064,0,0,8.34306,1172.19,-2068.15)">
                                
                                <g id="anim-body-wrapper" class="logo-part body">
                                    
                                    <g transform="matrix(1,0,0,1,0,-430.282)">
                                        <path class="logo-shape logo-t1" d="M52.363,473.36 L92.32,552.242 L52.363,552.242 Z" style="fill:currentColor;"/>
                                        <path class="logo-shape logo-t2" d="M92.32,473.36 L132.277,473.36 L132.277,552.242 Z" style="fill:currentColor;"/>
                                    </g>
                                    
                                    <g transform="matrix(1,0,0,1,0,-398.709)">
                                        <path class="logo-shape logo-para" d="M75.932,473.361 L100.133,473.361 L124.096,520.668 L99.895,520.668 Z" style="fill:currentColor;"/>
                                    </g>
                                </g>

                                <g id="anim-dot-wrapper" class="logo-part dot">
                                    <g transform="matrix(-1,0,0,1.00002,158.565,-481.178)">
                                        <ellipse class="logo-shape logo-dot-shape" cx="79.282" cy="538.245" rx="14.259" ry="14.259" style="fill:currentColor;"/>
                                    </g>
                                </g>

                            </g>
                        </g>
                    </g>
                </svg>
            </a>
        `;
    }

    public setTheme(theme: 'light' | 'dark'): void {
        if (this.element) {
            if (theme === 'dark') {
                this.element.classList.add('a-logo--dark');
            } else {
                this.element.classList.remove('a-logo--dark');
            }
        }
    }
}