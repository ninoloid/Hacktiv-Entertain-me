const objectId = require('mongodb').ObjectID

const tagsConverter = tags => {
  if (!tags) return null
  return tags.split(' ')
}

const popularityConverter = point => {
  if (!point) return null
  return Number(point)
}

const cleanEmptyPayload = (obj) => {
  for (let propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
  return obj
}

module.exports = {
  showMovies(db) {
    return db.collection('movies').find({}).toArray()
  },

  showOneMovie(db, id) {
    return db.collection('movies').findOne({ _id: objectId(id) })
  },

  addMovies(db, data) {
    const { title, overview, poster_path, popularity, tags } = data

    const payload = {
      title,
      overview,
      poster_path,
      popularity: popularityConverter(popularity),
      tags: tagsConverter(tags)
    }

    return db.collection('movies').insertOne(cleanEmptyPayload(payload))
  },

  updateMovies(db, id, data) {
    const { title, overview, poster_path, popularity, tags } = data
    console.log(title, overview)

    const payload = {
      title,
      overview,
      poster_path,
      popularity: popularityConverter(popularity),
      tags: tagsConverter(tags)
    }

    return db.collection('movies').updateOne({ _id: objectId(id) }, {
      $set: cleanEmptyPayload(payload)
    })
  },

  deleteMovie(db, id) {
    return db.collection('movies').deleteOne({ _id: objectId(id) })
  }
}