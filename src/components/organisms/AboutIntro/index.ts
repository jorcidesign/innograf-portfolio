import { Component } from '../../../core/Component';
import { aboutData } from '../../../data/about';
import './style.css';

export class AboutIntro extends Component {
    render(): string {
        const { intro } = aboutData;

        return `
            <section class="o-about-intro">
                <div class="container o-about-intro__container">
                    
                    <div class="o-about-intro__col-left">
                        <h1 class="o-about-intro__title">${intro.title}</h1>
                    </div>

                    <div class="o-about-intro__col-right">
                        <span class="o-about-intro__subtitle">${intro.subtitle}</span>
                        <div class="o-about-intro__divider"></div>
                        
                        <p class="o-about-intro__text">${intro.text}</p>

                        <div class="o-about-intro__stats">
                            <div class="o-about-intro__stat-item">
                                <span class="o-about-intro__label">Fundación</span>
                                <span class="o-about-intro__value">${intro.founded}</span>
                            </div>
                            <div class="o-about-intro__stat-item">
                                <span class="o-about-intro__label">Sede Principal</span>
                                <span class="o-about-intro__value">${intro.location}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        `;
    }
}