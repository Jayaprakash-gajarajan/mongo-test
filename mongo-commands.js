//hello
mongosh
db.movie.find({})

db.list.aggregate([
    { $match: { status: "urgent" } },
    { $group: { _id: "$productName", totalUrgentQuantity: { $sum: "$quantity" } } }
])

db.list.aggregate([
    { $match: { _id: "$status" } }
])

db.movie.find({})
db.movie.find({}, { $set: { language: "english" } })
db.movie.updateOne({ id: '103' }, { $set: { language: 'tamil' } })

db.movie.updateMany({}, { $pull: { languages: "hindi" } })

db.movie.updateMany({}, { $set: { languages: ["english", "tamil", "telungu", "kanadam", "hindi"] } })
