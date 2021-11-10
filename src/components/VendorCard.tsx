import Container from '@material-ui/core/Container'

const VendorCard= ({...vendor}) => {

    return(
        <div>
            <Container>
                    <div className='container'>
                    <div className='profile'>
                        {/* <div className='img-container'>
                            <img src={Image} />
                        </div> */}
                        <div className='sub-wrapper'>
                            <h1>{vendor.brandname}</h1>
                            <p>{vendor.location}</p>
                            <p>{vendor.services}</p>
                            <div className='contacts'>
                                <p>{vendor.phonenumber}</p>
                                <p>{vendor.email}</p>
                            </div>
                            <p>{vendor.bio}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default VendorCard