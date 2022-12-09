import uuid from 'react-native-uuid';

export default BookData = [
    {
        key: uuid.v4(),
        title: "Range",
        author: "David Epstein",
        color: 0,
        numExcerpts: 3,
        excerpts: [
            {
                key: uuid.v4(),
                text: `“The expression “young and foolish,” he wrote, describes the tendency of young adults to gravitate to risky jobs, but it is not foolish at all. It is ideal. They have less experience than older workers, and so the first avenues they should try are those with high risk and reward, and that have high informational value. Attempting to be a professional athlete or actor or to found a lucrative start-up is unlikely to succeed, but the potential reward is extremely high. Thanks to constant feedback and an unforgiving weed-out process, those who try will learn quickly if they might be a match, at least compared to jobs with less constant feedback. If they aren’t, they go test something else, and continue to gain information about their options and themselves.”`,
                chapter: 6,
                page: 135,
            },
            {
                key: uuid.v4(),
                text: `I worked in labs during and after college and realized that I was not the type of person who wanted to spend my entire life learning one or two things new to the world, but rather the type who wanted constantly to learn things new to me and share them.`,
                chapter: 6,
                page: 141,
            },
            {
                key: uuid.v4(),
                text: `A recent international Gallup survey of more than two hundred thousand workers in 150 countries reported that 85 percent were either “not engaged” with their work or “actively disengaged.” In that condition, according to Seth Godin, quitting takes a lot more guts than continuing to be carried along like debris on an ocean wave. The trouble, Godin noted, is that humans are bedeviled by the “sunk cost fallacy.” Having invested time or money in something, we are loath to leave it, because that would mean we had wasted our time or money, even though it is already gone.`,
                chapter: 6,
                page: 142,
            }
        ],
    },
    {
        key: uuid.v4(),
        title: "The Myth of Normal",
        author: "Gabor Mate",
        color: 1,
        numExcerpts: 4,
    },
    {
        key: uuid.v4(),
        title: "How to Change Your Mind",
        author: "Michael Pollan",
        color: 2,
        numExcerpts: 23,
    },
    {
        key: uuid.v4(),
        title: "Between Debt and the Devil",
        author: "Adair Turner",
        color: 3,
        numExcerpts: 7,
    },
];
