import {shuffleArray, getRandomInteger} from "../utils/common";

const generateDescription = () => {
  const fillerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const shuffledFillerText = shuffleArray(fillerText.substring(0, fillerText.length - 1).split(`. `));
  const count = getRandomInteger(1, 5);
  const destinationDescription = [];
  for (let i = 0; i < count; i++) {
    destinationDescription.push(shuffledFillerText[i]);
  }
  return `${destinationDescription.join(`. `)}.`;
};

const generatePictures = () => {
  const destinationPhotos = [];
  const count = getRandomInteger(0, 5);
  for (let i = 0; i < count; i++) {
    destinationPhotos.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture description`
    });
  }
  return destinationPhotos;
};


export const generateDestination = (name) => {
  return {
    description: generateDescription(),
    name,
    pictures: generatePictures(),
  };
};
