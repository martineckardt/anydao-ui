// TODO display results from Blockchain
export default function ProposalResults({ fuji, rike }) {
    const fujiSum = fuji.approvedCount + fuji.deniedCount;
    const rikeSum = rike.approvedCount + rike.deniedCount;

    return <>
        <p>VOTE to make $1INCH deflationary!</p>
        <h5>Crosschain results</h5>
        <div className="row mb-5">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">{((fuji.approvedCount + rike.approvedCount) / (fujiSum + rikeSum) * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{(fuji.approvedCount + rike.approvedCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">{((fuji.deniedCount + rike.deniedCount) / (fujiSum + rikeSum) * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{(fuji.deniedCount + rike.deniedCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
        </div>

        <div className="mb-4">Detailed Results</div>
        <h6>Fuji</h6>
        <div className="row mb-4">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">{(fuji.approvedCount / fujiSum * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{fuji.approvedCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">{(fuji.deniedCount / fujiSum * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{fuji.deniedCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
        </div>

        <h6>Rinkeby</h6>
        <div className="row">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">{(rike.approvedCount / rikeSum * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{rike.approvedCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">{(rike.deniedCount / rikeSum * 100).toFixed(2)}%</div>
                </div>
                <div className="fw-bolder">{rike.deniedCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
        </div>

    </>
}