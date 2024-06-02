export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

//input: string
//output: value from storage
export const getItem = (key) => JSON.parse(localStorage.getItem(key)) || [];
