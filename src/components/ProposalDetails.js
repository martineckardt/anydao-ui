import clock from '../assets/clock.svg';

export default function ProposalDetails() {
    return <>
        <div className="card">
            <div className="card-body">
                <div className='d-flex '>
                    <div className='flex-grow-1'>
                        <h6>VOTE to make $1INCH deflationary!</h6>
                        <div className="d-flex flex-row align-items-center mb-1">
                            <img src={clock} alt="anyDAO" style={{ height: 15 + 'px' }} className="me-1" />
                            <span style={{ opacity: 0.7 }}>Snapshot taken at 01th July 2022 10:23</span>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <img src={clock} alt="anyDAO" style={{ height: 15 + 'px' }} className="me-1" />
                            <span style={{ opacity: 0.7 }}>Voting period ends in 4h: 16m: 31s</span>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-warning">Voting</button>
                    </div>
                </div>
                <p>Implementing a strong deflationary mechanism to the 1inch token.</p>
                <p>Removing Single-Asset-Staking & Farming Completely. Replace with a deflationary mechanism.</p>
                <p>This eliminates sell pressure from the stakers as well, and everybody is incentivised as the supply decreases = more valuable… Holders will be more committed to hold the token, instead of farming/staking and then selling the token, which decreases the value of the token.</p>
            </div>
        </div>
    </>
}