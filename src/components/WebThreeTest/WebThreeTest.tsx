import {
    useAccount,
    useBalance,
    useConnect,
    useDisconnect,
} from 'wagmi'
import { ConnectWallet } from './ConnectWallet'
import { NoWalletDetected } from './NoWalletDetected'
import { SendTransaction } from './SendTransaction';



export default function WebThreeTest() {
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
        
    const { address, connector, isConnected, status } = useAccount();

    const { disconnect } = useDisconnect()

    const balance = useBalance({
        address: address,
        formatUnits: 'ether',
    });

    const cancelConnection = () => {
        disconnect()
    }

    if (window.ethereum === undefined) {
        return <NoWalletDetected />;
    }

    if (isConnected) {
        return (
            <>
                <ul>
                    <h3>Current connector: {connector?.name || 'None'}</h3>
                    <li>Connecting status: {status}</li>
                    <li>Address: {address}</li>
                    <li><button onClick={cancelConnection}>disconnect</button></li>
                </ul>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h4 >Current Blance: {balance.data?.formatted || '-'}</h4>
                        {
                            balance.data?.value.gt(0) && (
                                <SendTransaction/>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }

    return (<>
        <div>
            {connectors.map((connector,index) => (
                <ConnectWallet key={index}
                    connector={connector} connect={connect} isLoading={isLoading} pendingConnector={pendingConnector}
                />
            ))}
            {error && <div>{error.message}</div>}
        </div>
    </>)
}
