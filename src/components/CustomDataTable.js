import DataTable from "react-data-table-component";
import {Fragment, useEffect, useState} from "react"
import { ChevronDown, Search, XCircle } from "react-feather";
import ReactPaginate from "react-paginate";
import classNames from "classnames"
import { Row, Col, Input, ButtonGroup, Button } from "reactstrap";
import { useSkin } from "@hooks/useSkin"
import { useQuery } from "@tanstack/react-query";
import { getRequestByStringQuery } from "../helpers";
import SkeletonComponent from "./SkeletonComponent";

function CustomDataTable({
  columns,
  data,
  loading,
  border,
  apiURL,
  setApiData,
  queryKey,
  staffPage,
  id
}){
   
    //States
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [keyword, setKeyword]  = useState("")
    const [pageCount, setPageCount] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchType, setSearchType] = useState("name")
    const { skin } = useSkin()

    const { data: AllData, isLoading } = useQuery([queryKey, currentPage, rowsPerPage, keyword], () => {
      return getRequestByStringQuery(apiURL, `?per_page=${rowsPerPage}&page=${currentPage}&keyword=${keyword}`)
    }, {
      onSuccess: (response) => {
      },
      onError: (error) => {
        // SweetAlert("error", error.message)
      },
      retry: false,
      refetchOnWindowFocus: false
    })

    useEffect(() => {
      if(AllData){
      setApiData(AllData?.data.results)
      setRowsPerPage(AllData?.data.results.length)
      setPageCount(AllData?.data.info.pages)
      }
    }, [AllData])


   // ** Function to handle Pagination
   const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  }; 
  
  
  const handlePerPage = async (e) => {
    setRowsPerPage(e.target.value)
    setCurrentPage(1)
  }


    const CustomPagination = () => {
      // const count = Number(Math.ceil(store.total / rowsPerPage))
      const count = Number(Math.ceil(pageCount / rowsPerPage))
      return (
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName='active'
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={page => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      )
    };

    return(
      <Fragment>
        {
          apiURL && queryKey ?
          <div className={`react-dataTable ${border == true && "table-norder-cus"}`}>
          <DataTable
          customStyles={{
            subHeader: {
              style: {
                backgroundColor: skin === "dark" ? "#283046" : "#FFFFFF",
              },
            },
          }}
            noHeader
            subHeader
            highlightOnHover
            striped
            pagination
            responsive
            progressPending={isLoading}
            progressComponent={SkeletonComponent}
            paginationComponent={CustomPagination}
            columns={columns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            // paginationServer
            paginationDefaultPage={currentPage}
            data={data}
            subHeaderComponent={
              <div className='w-100 mb-75'>
              <Row>
                <Col
                  xl='4'
                  lg='4'
                  md='4' className='d-flex align-items-center p-0'>
                  <div className='d-flex align-items-center w-100'>
                    <label htmlFor='rows-per-page'>Show</label>
                    <Input
                      className='mx-50'
                      type='select'
                      id='rows-per-page'
                      value={rowsPerPage}
                      onChange={handlePerPage}
                      style={{ width: '5rem' }}
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                    </Input>
                    <label htmlFor='rows-per-page'>Entries</label>
                  </div>
                </Col>
                
                {
                  staffPage == true &&
                  <Col
                  xl={staffPage ==  true ? "4" : "8"}
                  lg={staffPage ==  true ? "4" : "8"}
                  md={staffPage ==  true ? "4" : "8"}
                  className='d-flex align-items-sm-center justify-content-md-end  flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-md-0 mt-1'
                >
                  <div style={{gap: 20}} className='d-flex align-items-center mb-sm-0 mb-1'>
                    <label className='mb-0' htmlFor='search-invoice2'>
                      Type:
                    </label>
                    <Input
                    className='mx-50'
                    type='select'
                    id='search-invoice2'
                    value={searchType}
                    style={{width: 200}}
                    onChange={(e) => {
                      setSearchType(e.target.value)
                    }}
                    >
                      <option value={"name"}>Name</option>
                      <option value={"location"}>Location</option>
                      <option value={"position"}>Position</option>
                      <option value={"region"}>Region</option>
                    </Input>
                  </div>
                </Col>
                }
               <Col
                  xl={staffPage ==  true ? "4" : "8"}
                  lg={staffPage ==  true ? "4" : "8"}
                  md={staffPage ==  true ? "4" : "8"}
                  className='d-flex align-items-sm-center justify-content-md-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-md-0 mt-1'
                >
                  <div style={{gap: 20}} className='d-flex align-items-center mb-sm-0 mb-1'>
                    <label className='mb-0' htmlFor='search-invoice'>
                      Search:
                    </label>
                    <Input
                      id='search-invoice'
                      className='ms-50 w-100'
                      type='text'
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value)
                      }}
                    />
                  </div>
                </Col>
                
              </Row>
            </div>
            }
          />
        </div>
        :
        <div className="text-center">
          Api Url Or Query Key Prop Is Missing
        </div>
        }
      </Fragment>
    )
}

export default CustomDataTable