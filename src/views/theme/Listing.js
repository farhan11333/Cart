import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Globe, Plus, Check, X } from "react-feather";
import CustomDataTable from "@customComponents/CustomDataTable"
import Avatar from "@components/avatar";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  InputGroup,
  Badge,
  Label,
  UncontrolledTooltip,
  Input,
  Spinner
} from "reactstrap";
import { apiUrls } from "../../constants";

const Listing = () => {

    const [apiData, setApiData] = useState([])
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([
        {
            name: "ID",
            maxWidth: "20px",
            selector: (row) => row.id,
        },
        {
          name: "Name",
          minWidth: "250px",
          cell: (row) => (
            <div className="d-flex align-items-center">
              <Avatar img={row.image} />
              <div className="user-info text-truncate ms-1 cursor-pointer">
                <span className="d-block fw-bold text-truncate text-primary">
                  {row.name}
                </span>
              </div>
            </div>
          ),
        },
        {
          name: "Species",
          minWidth: "250px",
          selector: (row) => row.species,
        },
        {
          name: "Gender",
          minWidth: "300px",
          selector: (row) => row.gender,
        },
        {
          name: "Status",
          minWidth: "150px",
          cell: (row) => {
            return (
              <div className="form-switch form-check-primary">
                <Input
                  key={row.id}
                  type="switch"
                  checked={row.status == "Alive" ? true : false}
                  id={`icon-primary-${row.id}`}
                  name={`icon-primary-${row.id}`}
                />
                <Label
                  className="form-check-label"
                  htmlFor={`icon-primary-${row.id}`}
                >
                  <span className="switch-icon-left">
                    <Check size={14} />
                  </span>
                  <span className="switch-icon-right">
                    <X size={14} />
                  </span>
                </Label>
              </div>
            );
          },
        }
      ])

    //Setting Data In Table After Api Response
    useEffect(()=> {
    if(apiData.length > 0){
        const temp = []
        apiData.map((one) => {
            const element = {
                id: one.id,
                name: one.name,
                species: one.species,
                gender: one.gender,
                image: one.image,
                status: one.status
            }
            temp.push(element)
        })
        setData(temp)
    }
    }, [apiData])

    

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader className="flex-md-row py-1 flex-column align-md-items-center align-items-center border-bottom">
              <CardTitle>
                
                <Globe className="me-1 text-primary" width={25} />
                <span className="align-middle">Listing</span>
              </CardTitle>
              <div className="d-flex align-itmes-center mt-2 mt-md-0">
                <div>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => {
                    }}
                    className="height-28"
                  >
                    <Plus size={15} />
                    <span className="align-middle ms-50">Add New Listing</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-1">
              <CustomDataTable
              data={data}
              columns={columns}
              apiURL={apiUrls.getChracters}
              queryKey={"get-chracters"}
              setApiData={setApiData}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      </Row >
    </Fragment>
  );
};

export default Listing;
