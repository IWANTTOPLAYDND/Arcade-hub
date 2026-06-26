const Save = {
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key, fallback){
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  }
};
