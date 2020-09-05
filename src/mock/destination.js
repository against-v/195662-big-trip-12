import {shuffleArray, getRandomInteger} from "../utils/common";
import {FILLER_TEXT} from "../const";

const generateDescription = () => {
  const shuffledFillerText = shuffleArray(FILLER_TEXT.substring(0, FILLER_TEXT.length - 1).split(`. `));
  const count = getRandomInteger(1, 5);
  const destinationDescription = [];
  for (let i = 0; i < count; i++) {
    destinationDescription.push(shuffledFillerText[i]);
  }
  return `${destinationDescription.join(`. `)}.`;
};

const generatePictures = () => {
  const pictures = [];
  const count = getRandomInteger(0, 5);
  for (let i = 0; i < count; i++) {
    pictures.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture description`
    });
  }
  return pictures;
};


export const generateDestination = (name) => {
  return {
    description: generateDescription(),
    name,
    pictures: generatePictures(),
  };
};
