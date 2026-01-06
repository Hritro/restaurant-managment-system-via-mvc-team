const handleError = (res,  message , error) => {
    console.log(error)
    res.status(500).send({success:false , message , error})
}

module.exports = {handleError}