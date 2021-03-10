import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store;

const initialState: InitialState = {
  currentLesson: 0,
  currentWorld: 0,
  lessons: [],
  worlds: [],
  exercises: [],
  isLastWorld: false,
  isLastLesson: false,
};

type InitialState = {
  currentWorld: number;
  currentLesson: number;
  lessons: number[];
  worlds: number[];
  exercises: number[];
  isLastWorld: boolean;
  isLastLesson: boolean;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WORLD":
      const isLastWorld =
        action.world === state.worlds[state.worlds.length - 1];

      return {
        ...state,
        currentWorld: action.world,
        isLastWorld,
      };
    case "SET_LESSON":
      const isLastLesson =
        action.lesson === state.lessons[state.lessons.length - 1];

      return {
        ...state,
        currentLesson: action.lesson,
        isLastLesson,
      };
    case "SET_LESSONS":
      return {
        ...state,
        lessons: action.lessons,
      };
    case "SET_WORLDS":
      return {
        ...state,
        worlds: action.worlds,
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: "primary",
  storage,
  whitelist: Object.keys(initialState),
};
const persistedReducer = persistReducer(persistConfig, reducer);

function makeStore(initState = initialState as any) {
  return createStore(
    persistedReducer,
    initState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
