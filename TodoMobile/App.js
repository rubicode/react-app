import React from 'react';
import TodoBox from './src/features/todo/TodoBox';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <TodoBox />
    </Provider>
  )
}

export default App;
