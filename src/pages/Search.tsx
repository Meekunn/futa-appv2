import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import VendorCard from '../components/VendorCard'


const  SearchPage = () => {

  const [vendorsData, setVendorsData] = useState<any>([])
  const [searchBrandname, setSearchBrandname] = useState<string>("")
  const [searchLocation, setSearchLocation] = useState<string>("")
  const [searchOutput, setSearchOutput] = useState<any>([])
  const trimText = useCallback((text: string) => text.replace(/\s+/g,'').toLowerCase(),[])

    useEffect(() => {
        getVendorsData()
    }, [])

    const getVendorsData = async () => {
        try{
            const response = await axios.get('https://us-central1-my-app-e4b5c.cloudfunctions.net/app/vendors')
            const data = response.data
            setVendorsData(data)
        } catch (error){
            return
        }
    }

    const handleSearch = (val: any) => {
      setSearchBrandname(trimText(val))
      if(searchBrandname || searchLocation === ""){
        return setSearchOutput([])
      }
    }
  
  return(
    
        <div>
          <div className="search-area">
                <TextField className='filter-bar'
                    placeholder='Search by brandname' 
                    onChange={e=>{setSearchBrandname(e.target.value); handleSearch(e.target.value)}}
                    fullWidth
                />
                <TextField className='filter-bar'
                    placeholder='Search by location' 
                    onChange={e=>{setSearchLocation(e.target.value); handleSearch(e.target.value)}}
                    fullWidth
                />
                
            </div>
            {searchBrandname.length > 0 || searchLocation.length > 0 ? 
            vendorsData
              .filter((data: any) => {
                return trimText(data.brandname).includes(trimText(searchBrandname))
              })
              .map((vendor: any) => {
                return(
                  <VendorCard key={vendor.id} brandname={vendor.brandname} location={vendor.location} services={vendor.services} bio={vendor.bio}
                  email={vendor.email} phonenumber={vendor.phonenumber} />
                )}):
                <div className='empty-wrapper' style={{color: '#fffdfd'}} >No record found</div>
            }
        </div>
    )
  }
  
  export default SearchPage
  
  