var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
function dateParser (begin, duration) {
  var beginDate = new Date(begin)
  var durationDate = new Date(duration)
  var endDate = new Date(durationDate.getTime() + beginDate.getTime())
  var result = {}
  result.begin = {
    day: beginDate.getDate(),
    month: MONTHS[beginDate.getMonth()],
    year: beginDate.getFullYear()
  }
  result.end = {
    day: endDate.getDate(),
    month: MONTHS[endDate.getMonth()],
    year: endDate.getFullYear()
  }
  return result
}

module.exports = dateParser
