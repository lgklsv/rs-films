export const toggleSearchBar = () => {
  const search = document.querySelector('.search') as HTMLElement;
  search.classList.toggle('search_open');

  const icon = search.querySelector('.search__icon') as HTMLElement;
  icon.classList.toggle('hidden');

  const input = document.getElementById('search-input') as HTMLInputElement;
  input.classList.toggle('search__input_open');

  const close = document.querySelector('.search__close') as HTMLElement;
  close.classList.toggle('search__close_open');
};