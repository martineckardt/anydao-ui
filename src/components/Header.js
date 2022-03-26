import substr from "../utils/substr";
import logo_light from '../assets/logo_light.svg';

export default function Header({ onWalletConnectClick, loading, currentAccount }) {
    return (
        <div className="row py-4">
            <div className="col-5"><h4>anyDAO</h4></div>
            <div className="col-2 text-center">
                <img src={logo_light} alt="anyDAO" style={{ height: 28 + 'px' }} />
            </div>
            <div className="col-5 text-end">
                <button type="button" className="btn btn-outline-light" onClick={onWalletConnectClick}>
                    {loading ? substr(currentAccount) : 'Connect Wallet'}
                </button>
            </div>
        </div>
    )
}