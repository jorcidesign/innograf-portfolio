import { Component } from '../../../core/Component';
import type { TeamMember } from '../../../data/about';
import './style.css';

interface TeamCardProps {
    member: TeamMember;
    className?: string;
}

export class TeamCard extends Component {
    constructor(props: TeamCardProps) {
        super(props);
    }

    render(): string {
        const { member, className = '' } = this.props as TeamCardProps;

        return `
            <article class="a-team-card ${className}">
                <div class="a-team-card__image-wrapper">
                    <img 
                        src="${member.image}" 
                        alt="${member.name}" 
                        class="a-team-card__image" 
                        loading="lazy"
                    >
                </div>
                
                <div class="a-team-card__overlay">
                    <div class="a-team-card__content">
                        <h3 class="a-team-card__name">${member.name}</h3>
                        <span class="a-team-card__role">${member.role}</span>
                        
                        <div class="a-team-card__divider"></div>
                        
                        ${member.email ? `
                            <a href="mailto:${member.email}" class="a-team-card__contact">
                                Contactar
                            </a>
                        ` : ''}
                    </div>
                </div>
            </article>
        `;
    }
}