import logo_dark from '../assets/logo_dark.svg';

/**
 * Footer containing meta information about the application.
 */
export default function Footer() {
    return (
        <div className="container-fluid mt-auto py-2 bg-light text-dark">
            <div className="row">
                <span className="col-md-5 text-center">anyDAO built for the BitDAO 2022 Hackathon</span>
                <span className="col-md-2 text-center">
                    <img src={logo_dark} alt="anyDAO" style={{ height: 15 + 'px' }} />
                </span>
                <span className="col-md-5 text-center">Powered by LayerZero</span>
            </div>
        </div>
    )
};