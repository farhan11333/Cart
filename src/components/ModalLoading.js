import { Spinner } from "reactstrap";

function ModalLoading({height, color}){
    const fixedHieght = 300
    return(
        <div className="d-flex justify-content-center" style={{height: height ? height : fixedHieght}}>
            <Spinner color={color ? color : "primary"} style={{marginTop: "50%"}} />
        </div>
    )
}

export default ModalLoading