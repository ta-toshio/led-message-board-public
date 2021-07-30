class CreateWorker {
  constructor(worker) {
    let code = worker.toString()
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'))
    return new Worker(
      URL.createObjectURL(
        new Blob([code], { type: 'application/javascript' })
      )
    )
  }
}

export default (files) => {
  return files.map(file => new CreateWorker(file))
}