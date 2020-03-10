export function Rater(ratingElement) {
  const stars = ratingElement.querySelectorAll('.star');

  const setRating = (e) => {
    ratingElement.setAttribute('data-rating', e.currentTarget.getAttribute('data-value'));
  };

  const ratingHover = (e) => {
    const currentHover = e.currentTarget.getAttribute('data-value');
    highlightRating(currentHover);
  };
  
  const resetRating = () => {
    const currentRating = ratingElement.getAttribute('data-rating');
    highlightRating(currentRating);
  };

  const highlightRating = (rating) => {
    stars.forEach((star) => {
      star.style.color = rating >= star.getAttribute('data-value') ? 'yellow' : 'grey';
    });
  };

  resetRating();

  stars.forEach((star) => {
    star.addEventListener('click', setRating);
    star.addEventListener('mouseover', ratingHover);
  })
}
