module.exports = (err, req, res, next) => {
  // console.log('error handlers', err)
  let status = 500
  let errObj = {
    msg: "Internal Server Error"
  }

  if (err.type === "notfound") {
    status = 404
    errObj.msg = "Item not found in the database"
  } else if (err.type === "notmodified") {
    console.log('gagantiiii')
    status = 400
    errObj.msg = "Failed to modify the item"
  } else if (err.type === "notdeleted") {
    status = 400
    errObj.msg = "Failed to delete the item"
  }

  res
    .status(status)
    .json({ errObj })
}