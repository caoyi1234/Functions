function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}
console.log(getTime()); //2020-08-20T16:00:00.000Z
console.log(getTime('start'));