

export function ConnectWallet({ connector, connect, isLoading, pendingConnector }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">

        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>

          <button
            className="btn btn-warning"
            type="button"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>

        </div>
      </div>
    </div>
  );
}
