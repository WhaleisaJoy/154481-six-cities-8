import LoadingPage from '../pages/loading-page/loading-page';

type LoadWrapperProps = {
  isLoad: boolean,
  children: JSX.Element,
};

function LoadWrapper({isLoad, children}: LoadWrapperProps): JSX.Element {
  return (isLoad && children) || <LoadingPage />;
}

export default LoadWrapper;
