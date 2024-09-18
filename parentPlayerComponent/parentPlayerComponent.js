import { LightningElement } from 'lwc';

export default class ParentPlayerComponent extends LightningElement {
    playerDetails=[{
        Team: 'CSK',
        Name:'Dhoni',
        Description:'Mahendra Singh Dhoni is an Indian professional cricketer who plays as a right-handed batter and a wicket-keeper.',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/57.png'
    },
    {
        Team: 'CSK',
        Name:'Jadeja',
        Description:'Jadeja is an Indian international cricketer. He is an all-rounder, who bats left-handed and bowls left-arm orthodox spin.',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/46.png'
    },
    {
        Team: 'CSK',
        Name:'Ruturaj',
        Description:'Ruturaj is an Indian international cricketer who captains the Maharashtra cricket team in the T20, and the current captain of Chennai Super Kings in the IPL',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/102.png' 
    },
    {
        Team: 'MI',
        Name:'Rohit',
        Description:'Rohit is an Indian international cricketer who currently plays for and captains the India national cricket team in Test and One Day International matches.',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/6.png'
    },
    {
        Team: 'MI',
        Name:'Suryakumar',
        Description:'Suryakumar Yadav, also known by his initials SKY, is an Indian cricketer. He is a right-handed lower middle-order batter.',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/174.png'
    },
    {
        Team: 'MI',
        Name:'Hardik',
        Description:'Hardik is an Indian international cricketer who plays for the Indian cricket team. An all-rounder who bats right-handed in the middle-order and bowls right-arm fast-medium deliveries.',
        src:'https://documents.iplt20.com/ipl/IPLHeadshot2024/54.png' 
    }];
}