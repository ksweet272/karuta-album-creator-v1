class Card {
    constructor(cardId, print, edition, series, cardName) {
        this.cardId = cardId;
        this.print = print;
        this.edition = edition;
        this.series = series;
        this.cardName = cardName;
        this.imageUrl = this.generateImageUrl();
    }

    generateImageUrl() {
        const imageName = encodeURIComponent(this.cardName.replace(/\s+/g, '-').toLowerCase());
        return `https://d2l56h9h5tj8ue.cloudfront.net/images/cards/${imageName}-${this.edition}.jpg`;
    }
}

export const parseCardInput = (input) => {
    const lines = input.split('\n').slice(0, 40);
    return lines.map(line => {
        const cardData = {};

        const cardIdMatch = line.match(/^.*?([^\s]+) ·/);
        cardData.cardId = cardIdMatch ? cardIdMatch[1].trim() : null;

        const printMatch = line.match(/#(\d+)/);
        cardData.print = printMatch ? printMatch[1] : null;

        const editionMatch = line.match(/◈(\d+)/);
        cardData.edition = editionMatch ? editionMatch[1] : null;

        const seriesMatch = line.match(/◈\d+ · ([^·]+) ·/);
        cardData.series = seriesMatch ? seriesMatch[1].trim() : null;

        const cardNameMatch = line.match(/· ([^·]+)$/);
        cardData.cardName = cardNameMatch ? cardNameMatch[1].trim() : null;

        if (cardData.cardId !== null) {
            return new Card(cardData.cardId, cardData.print, cardData.edition, cardData.series, cardData.cardName);
        } else {
            return null;
        }
    }).filter(card => card !== null);
};
