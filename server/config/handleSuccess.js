const handleSucess = (res,  message , result) => {
    res.status(200).send({success: true, message , result})
}

module.exports = {handleSucess}