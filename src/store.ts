import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    id: number;
    title: string;
    category: string;
    date: string;
    description: string;
  }


interface AppState {
  items: Item[];
}

const initialState: AppState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;

export default configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});






