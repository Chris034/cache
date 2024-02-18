import styled from 'styled-components';
import { device } from '../designSystem/screenSizeConfig';

export const TitleContainer = styled.div<{
    $translateX?: number;
    $translateY?: number;
}>`
    padding: 10px;
    position: absolute;
        left: 12%;
        top: 20%;
        transform: translate(
            ${(props) => (props.$translateX ? props.$translateX : 0)}%,
            ${(props) => (props.$translateY ? props.$translateY : 0)}%
        );
        width: 75%;
`;

export const Title = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 144px;
    font-weight: 700;
    line-height: 187px;
    letter-spacing: -0.05em;
    text-align: left;
    margin-left: -10px;
    margin-bottom: -25px;

    @media ${device.mobile} {
        font-size: 96px;
        line-height: 93px;
        margin-bottom: 0;
        padding-bottom: 20px;
    }
`;

export const Tagline = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 72px;
    font-weight: 400;
    line-height: 94px;
    letter-spacing: -0.05em;
    text-align: left;

    @media ${device.mobile} {
        font-size: 36px;
        line-height: 47px;
        padding-bottom: 20px;
    }
`;

export const Description = styled.div`
    color: #ffffff;
    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;

    @media ${device.mobile} {
        font-size: 16px;
        line-height: 20px;
    }
`;

export const ButtonGroup = styled.div<{
    $gap?: string;
    $marginTop?: string;
    $position?: string;
    $justifyContent?: string;
}>`
    position: ${(props) => props.$position || 'absolute'};
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.$justifyContent || 'center'};
    align-items: center;
    margin-top: ${(props) => props.$marginTop || 0};
    left: 0;
    width: 100%;
    gap: ${(props) => props.$gap || '10px'}; // Default gap adjusted for better spacing
    padding: 10px;

    @media ${device.mobile} {
        gap: 12px; // Smaller gap for a tighter layout
        $marginTop: '10px'; // Adjust top margin if necessary
    }
`;

export const ActionButton = styled.button`
    box-shadow: -3px 5px #ffffff;
    transition: all ease-in 0.05s;

    font-family: IBM Plex Mono;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    text-align: left;
    max-height: 75px;
    min-width: 120px;

    background-color: #232323;
    border: 2px solid white;
    color: #ffffff;
    padding: 12px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    &:hover {
        box-shadow: none;
        transform: translateY(4px) !important;
        transition: all ease-in 0.05s;
    }

    @media ${device.mobile} {
        font-size: 16px; // Slightly smaller font size for better fit
        padding: 10px 20px; // Adjust padding for smaller screens
        box-shadow: -2px 3px #ffffff; // Adjust shadow for consistency
        overflow: hidden;
        padding: 6px 12px;
        font-size: 12px; // Further reduce font size for very small screens
        min-width: 75px;
        
    }
`;
