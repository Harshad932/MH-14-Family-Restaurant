const STORAGE_KEY = 'mh14_customer_order_v1';
const TABLE_KEY = 'mh14_table_number_v1';
const NOTES_KEY = 'mh14_cooking_notes_v1';

export const loadSavedOrder = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading order from localStorage:', err);
    return [];
  }
};

export const saveOrderToStorage = (orderItems) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderItems));
  } catch (err) {
    console.error('Error saving order to localStorage:', err);
  }
};

export const loadSavedTable = () => {
  try {
    return localStorage.getItem(TABLE_KEY) || '';
  } catch (err) {
    return '';
  }
};

export const saveTableToStorage = (tableNum) => {
  try {
    localStorage.setItem(TABLE_KEY, tableNum);
  } catch (err) {
    console.error('Error saving table to localStorage:', err);
  }
};

export const loadSavedNotes = () => {
  try {
    return localStorage.getItem(NOTES_KEY) || '';
  } catch (err) {
    return '';
  }
};

export const saveNotesToStorage = (notes) => {
  try {
    localStorage.setItem(NOTES_KEY, notes);
  } catch (err) {
    console.error('Error saving notes to localStorage:', err);
  }
};

export const clearOrderStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NOTES_KEY);
  } catch (err) {
    console.error('Error clearing storage:', err);
  }
};
