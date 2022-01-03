import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

const LoaderHoc = (
  WrappedComponent,
) => {
  function HocLoader(props) {
    const [isLoading, setIsLoading] = useState(false);
    const setLoadingState = useCallback(
      (isDataLoading) => {
        setIsLoading(isDataLoading);
      },
      []
    );
    return (
      <>
        {isLoading && (
          <div className="loader-main">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
        <WrappedComponent {...props} setIsLoading={setLoadingState} />
      </>
    );
  }
  return HocLoader;
};

LoaderHoc.propTypes = {
  WrappedComponent: PropTypes.any,
  loadingMessage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default LoaderHoc;