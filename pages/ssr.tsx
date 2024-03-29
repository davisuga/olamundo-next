import Home from ".";
import { initializeStore, initialState } from "../store";

export default function SSR() {
  return <Home />;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
  const reduxStore = initializeStore(initialState);
  const { dispatch } = reduxStore;

  //   dispatch({
  //     type: 'TICK',
  //     light: false,
  //     lastUpdate: Date.now(),
  //   })

  return { props: { initialReduxState: reduxStore.getState() } };
}
