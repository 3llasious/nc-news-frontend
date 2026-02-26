function LoadingState({ isLoading }) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <h1 className="loading-title">The Digest</h1>
      </div>
    );
  }
}

export default LoadingState;
