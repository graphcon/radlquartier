
// ride count per month
db.rides.aggregate( [
    { 
        $project: {
            bikeNumber: "$bikeNumber",
            year: { $year: "$start.date"},
            month: { $month: "$start.date" },
            day: { $dayOfMonth: "$start.date" },
            hour: { $hour: "$start.date" },
            week: { $isoWeek: "$start.date" },
            dayOfWeek: { $isoDayOfWeek: "$start.date" }
        } 
    },
    { 
        $group: { 
            _id: { year: "$year", month: "$month"}, 
            count: { $sum: 1 }
        } 
    },
    { 
        $sort : { "_id.year": 1, "_id.month": 1 } 
    }
]);
printjson(cursor.toArray());