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
  showAllSeries(db) {
    return db.collection('series').find({}).toArray()
  },

  showOneSeries(db, id) {
    return db.collection('series').findOne({ _id: objectId(id) })
  },

  addSeries(db, data) {
    const { title, overview, poster_path, popularity, tags } = data

    const payload = {
      title,
      overview,
      poster_path,
      popularity: popularityConverter(popularity),
      tags: tagsConverter(tags)
    }

    return db.collection('series').insertOne(cleanEmptyPayload(payload))
  },

  updateSeries(db, id, data) {
    const { title, overview, poster_path, popularity, tags } = data
    console.log(title, overview)

    const payload = {
      title,
      overview,
      poster_path,
      popularity: popularityConverter(popularity),
      tags: tagsConverter(tags)
    }

    return db.collection('series').updateOne({ _id: objectId(id) }, {
      $set: cleanEmptyPayload(payload)
    })
  },

  deleteSeries(db, id) {
    return db.collection('series').deleteOne({ _id: objectId(id) })
  }
}