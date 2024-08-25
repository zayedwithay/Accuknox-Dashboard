// src/store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is installed if using it for unique IDs

// Initial state
const initialState = {
  categories: []
};

// Create a slice for the dashboard
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addWidget(state, action) {
      const { categoryId, name, text } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push({
          id: uuidv4(),
          name,
          text
        });
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    }
  }
});

// Export actions
export const { setCategories, addWidget, removeWidget } = dashboardSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer
  }
});

export default store;
