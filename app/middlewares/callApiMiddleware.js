module.exports = (URL)=>{
    async (req, res, next) => {
        try {
          // Thực hiện cuộc gọi API bằng Axios ở đây.
          const apiResponse = await axios.get( URL ,{
            headers: {
                'Authorization': `${accessToken}`
            }
          });
          req.data = apiResponse.data;
        //   console.log(typeof(apiResponse.data))
          return next();
          
        } catch (error) {
          // Xử lý lỗi nếu có.
          res.redirect('/');
        }
    
    }
}