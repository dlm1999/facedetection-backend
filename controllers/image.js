const Clarifai = require('Clarifai')

const app = new Clarifai.App({
 apiKey: '2d835cf765954f4cb15fd66f0306f24a'
});
const handleApiCall = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleImagePut = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries' ,1)
  	.returning('entries')
  	.then(entries =>{
  		res.json(entries[0])
  	})
  	.catch(err => res.status(400).json('unable getting entries'))
}

module.exports = {
	handleApiCall:handleApiCall,
	handleImagePut:handleImagePut
}
